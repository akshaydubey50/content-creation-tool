import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import UserModel from "@/models/user/User.model";
import mongoose from "mongoose";
import connectDB from "@/db/dbConnect";
import LikeModel from "@/models/likes/Like.model";

export async function GET(req: NextRequest) {
  await connectDB();

  const token = await getToken({ req: req });
  console.log("token for likes :::", token);
  try {
    const user = await UserModel.findOne({
      email: token?.email,
    });
    console.log("user found for /like api ::: ", user);

    const likes = await LikeModel.aggregate([
      {
        $group: {
          _id: "$productId",
          totalLikes: { $sum: 1 },
          userIds: { $push: "$userId" },
        },
      },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          totalLikes: "$totalLikes",
          isProductLikedByUser: {
            $cond: {
              /* if: { $eq: [null, user?.id] },
              then: null,
              else: {
                $in: [
                  user?.id ? new mongoose.Types.ObjectId(user.id) : null,
                  "$userIds",
                ],
              }, */
              if: {
                $or: [
                  { $eq: [user?.id, null] },
                  { $eq: [user?.id, undefined] },
                ],
              },
              then: false,
              else: {
                $in: [new mongoose.Types.ObjectId(user?.id), "$userIds"],
              },
            },
          },
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
