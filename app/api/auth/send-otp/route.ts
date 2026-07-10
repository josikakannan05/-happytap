import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Otp from "@/lib/models/Otp";
import User from "@/lib/models/User";
import nodemailer from "nodemailer";

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
    }

    const otpCode = generateOtp();

    // Save/Update OTP in DB
    await Otp.findOneAndUpdate(
      { email: email.toLowerCase() },
      { code: otpCode, verified: false, createdAt: new Date() },
      { upsert: true, new: true }
    );

    // Try sending email
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || "no-reply@happytap.com";

    // ALWAYS log OTP in development so developers can see it without SMTP credentials
    console.log(`[OTP DEBUG] Generated OTP for ${email}: ${otpCode}`);

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort || "587"),
        secure: smtpPort === "465",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: smtpFrom,
        to: email,
        subject: "Your HappyTap Verification Code",
        text: `Your verification code is ${otpCode}. It is valid for 5 minutes.`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #4f46e5; text-align: center;">HappyTap Verification Code</h2>
            <p>Hello,</p>
            <p>Thank you for choosing HappyTap. Please use the following verification code to complete your signup process:</p>
            <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #111827; border-radius: 5px; margin: 20px 0;">
              ${otpCode}
            </div>
            <p>This code is valid for 5 minutes. If you did not request this code, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #6b7280; text-align: center;">© 2026 HappyTap. All rights reserved.</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, message: "OTP sent successfully" });
  } catch (error: any) {
    console.error("Error in send-otp route:", error);
    return NextResponse.json({ error: "Failed to send OTP. Please try again." }, { status: 500 });
  }
}
