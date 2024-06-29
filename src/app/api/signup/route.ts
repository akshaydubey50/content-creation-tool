import connectDB from "@/lib/dbConnect";
import UserModel from "@/models/user/User.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();
  //get email and password
  //check if email exist
  //if exit throw error
  //hashed password
  //save user to db
  //return user response

  try {
    const { email, password } = await request.json();
    console.log({ email, password });
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and Password are required",
        },
        { status: 400 }
      );
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "email already exist",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      email,
      password: hashedPassword,
    });
    await user.save();

    const newUser = await UserModel.findOne({ email }).select("-password");
    if (!user) {
      return NextResponse.json({
        status: false,
        message: "Error while creating user",
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "user created successfully",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("Error while creating user", error);
    throw Error(error.message);
    /* return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    ); */
  }
}
