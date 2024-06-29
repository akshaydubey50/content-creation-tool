import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import UserModel from "@/models/user/User.model";
import mongoose from "mongoose";
import connectDB from "@/lib/dbConnect";
import LikeModel from "@/models/likes/Like.model";

export async function GET(req: NextRequest) {
  await connectDB();

  const token = await getToken({ req: req });

  if (!token) {
    return NextResponse.json(
      { success: false, msg: "Unauthorized access" },
      { status: 400 }
    );
  }
  //   const id = "667ff969d27bcfc89d2a86ce";
  try {
    const user = await UserModel.findById({
      _id: token?._id,
    });

    if (!user) {
      return NextResponse.json(
        { success: false, msg: "User does not exist" },
        { status: 404 }
      );
    }

    const likes = await LikeModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(user?._id),
        },
      },
      {
        $group: {
          _id: null,
          productIds: { $addToSet: "$productId" },
          totalLikes: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          productIds: "$productIds",
          totalLikes: "$totalLikes",
        },
      },
    ]);

    if (likes.length === 0) {
      return NextResponse.json(
        { success: true, msg: "No product Liked" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: true, msg: "Liked product fetched successfully", likes },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error while fetching bookmark ==> ", error);

    return NextResponse.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}
