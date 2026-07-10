import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "happytap-secret-key-change-me";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      return NextResponse.json({
        authenticated: true,
        user: {
          id: decoded.userId,
          email: decoded.email,
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          accountType: decoded.accountType,
          companyName: decoded.companyName,
        },
      });
    } catch (err) {
      // Invalid or expired token, clear cookie
      const response = NextResponse.json({ authenticated: false }, { status: 200 });
      response.cookies.delete("token");
      return response;
    }
  } catch (error) {
    console.error("Error in me/session route:", error);
    return NextResponse.json({ authenticated: false, error: "Failed to get session" }, { status: 500 });
  }
}
