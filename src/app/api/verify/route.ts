import connectDB from "@/db/dbConnect";
import UserModel from "@/models/user/User.model";

export async function POST(request: Request) {
  await connectDB();
  try {
    const { email, code } = await request.json();

    const isExistingUser = await UserModel.findOne({ email });
    if (!isExistingUser) {
      return Response.json({ success: false, message: "User not found" });
    }

    const isValidCode = isExistingUser.verifyCode === code;
    const isCodeNotExpiry =
      new Date(isExistingUser.verifyCodeExpiry) > new Date();

    if (isValidCode && isCodeNotExpiry && !isExistingUser.isVerified) {
      isExistingUser.isVerified = true;
      await isExistingUser.save();

      return Response.json(
        {
          success: true,
          message: "Verified Code successfully",
        },
        { status: 200 }
      );
    } else if (!isValidCode) {
      return Response.json(
        {
          success: false,
          message: "Incorrect Verification Code",
        },
        { status: 400 }
      );
    } else if (isValidCode && isCodeNotExpiry && isExistingUser.isVerified) {
      return Response.json(
        {
          success: false,
          message: "You are already verified.",
        },
        { status: 200 }
      );
    }
    return Response.json(
      {
        success: false,
        message:
          "Verification code is Expired. Please sign in again to get new code.",
      },
      { status: 400 }
    );
  } catch (error) {
    console.log("Error while verifing code", error);
    return Response.json(
      { success: false, message: "Failed to verify code" },
      { status: 500 }
    );
  }
}
