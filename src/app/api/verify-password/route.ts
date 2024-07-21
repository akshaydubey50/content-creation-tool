import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/dbConnect";
import UserModel from "@/models/user/User.model";
import crypto from "crypto";
import { sendmail } from "@/lib/sendmail";

export async function POST(req: NextRequest) {
  await connectDB();

  const { token } = await req.json();

  if (!token) {
    return NextResponse.json(
      {
        status: false,
        message: "Token code is required",
      },
      { status: 400 }
    );
  }

  const user = await UserModel.findOne({ email: "" });

  if (!user) {
    return NextResponse.json(
      {
        status: false,
        message: "user with email not found",
      },
      { status: 404 }
    );
  }
}
