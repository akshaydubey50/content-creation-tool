import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import UserModel from "@/models/user/User.model";
import mongoose from "mongoose";
import connectDB from "@/db/dbConnect";
import BookmarkModel from "@/models/bookmark/Bookmark.model";

export async function GET(req: NextRequest) {
  await connectDB();

  const token = await getToken({ req: req });
  console.log("token ####", token);

  if (!token) {
    console.log("token undefined", token);
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

    const bookmarks = await BookmarkModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(user?._id),
        },
      },
      {
        $group: {
          _id: null,
          productIds: { $addToSet: "$productId" },
          totalBookmarks: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          productIds: "$productIds",
          totalBookmarks: "$totalBookmarks",
        },
      },
    ]);

    if (bookmarks.length === 0) {
      return NextResponse.json(
        { success: true, bookmarks: null, msg: "No product bookmarked" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        msg: "Bookmark product fetched successfully",
        bookmarks,
      },
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
