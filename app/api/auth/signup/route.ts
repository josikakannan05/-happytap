import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";
import Otp from "@/lib/models/Otp";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "happytap-secret-key-change-me";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password, accountType, companyName } = await request.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (accountType === "company" && !companyName) {
      return NextResponse.json({ error: "Company name is required for company accounts" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
    }

    // Verify OTP was indeed validated
    const otpRecord = await Otp.findOne({ email: email.toLowerCase(), verified: true });
    if (!otpRecord) {
      return NextResponse.json({ error: "Please verify your email via OTP before signing up" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      accountType: accountType || "individual",
      companyName: accountType === "company" ? companyName : undefined,
    });

    // Delete verified OTP record so it cannot be reused
    await Otp.deleteOne({ _id: otpRecord._id });

    // Generate JWT
    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        accountType: newUser.accountType,
        companyName: newUser.companyName,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        accountType: newUser.accountType,
        companyName: newUser.companyName,
      },
    });
  } catch (error: any) {
    console.error("Error in signup route:", error);
    return NextResponse.json({ error: "Failed to create account. Please try again." }, { status: 500 });
  }
}
