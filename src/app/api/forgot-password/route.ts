import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/dbConnect";
import UserModel from "@/models/user/User.model";
import crypto from "crypto";
import { sendmail } from "@/lib/sendmail";
import { APPConf } from "@/conf/conf";

function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function POST(req: NextRequest) {
  await connectDB();

  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      {
        status: false,
        message: "Email is required to reset password",
      },
      { status: 400 }
    );
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return NextResponse.json(
      {
        status: false,
        message: "user with email not found",
      },
      { status: 404 }
    );
  }

  //generate the token
  const resetToken = generateToken();

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //save in db
  user.forgetPasswordToken = hashedToken;
  user.forgetPasswordTokenExpiry = new Date(Date.now() + 3600000);
  await user.save();

  const resetLink = `${APPConf.BASE_URL}/reset-password?token=${resetToken}`;

  //send link in email
  await sendmail(user.email, resetLink, true);
  //return response
  return NextResponse.json(
    {
      success: true,
      message: "Password reset token generated successfully",
    },
    { status: 200 }
  );
}
