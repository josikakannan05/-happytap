import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Otp from "@/lib/models/Otp";

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json({ error: "Email and OTP code are required" }, { status: 400 });
    }

    await dbConnect();

    // Find the latest OTP for this email
    const otpRecord = await Otp.findOne({ email: email.toLowerCase() });

    if (!otpRecord) {
      return NextResponse.json({ error: "OTP has expired or does not exist. Please request a new one." }, { status: 400 });
    }

    if (otpRecord.code !== code) {
      return NextResponse.json({ error: "Invalid OTP code" }, { status: 400 });
    }

    // Set verified flag to true
    otpRecord.verified = true;
    await otpRecord.save();

    return NextResponse.json({ success: true, message: "OTP verified successfully" });
  } catch (error: any) {
    console.error("Error in verify-otp route:", error);
    return NextResponse.json({ error: "Failed to verify OTP. Please try again." }, { status: 500 });
  }
}
