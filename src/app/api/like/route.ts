import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import UserModel from "@/models/user/User.model";
import mongoose from "mongoose";
import connectDB from "@/db/dbConnect";
import LikeModel from "@/models/likes/Like.model"; // Assuming you have a LikeModel similar to BookmarkModel

// GET: Fetch all liked items
export async function GET(req: NextRequest) {
  await connectDB();

  const token = await getToken({ req: req });

  if (!token || token?._id === undefined) {
    return NextResponse.json(
      { success: false, msg: "Unauthorized access" },
      { status: 400 }
    );
  }

  try {
    const user = await UserModel.findOne({
      email: token?.email,
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
          _id: "$itemType", // Group by itemType (either 'product' or 'prompt')
          itemIds: { $addToSet: "$itemId" }, // Collect all itemIds for the corresponding itemType
          totalLikes: { $sum: 1 }, // Count total likes
        },
      },
      {
        $project: {
          _id: 0, // Remove _id from the result
          itemType: "$_id", // Set _id as itemType in the result
          itemIds: "$itemIds", // Array of itemIds (products or prompts)
          totalLikes: "$totalLikes", // Total count of likes for this itemType
        },
      },
    ]);

    if (likes.length === 0) {
      return NextResponse.json(
        { success: true, likes: null, msg: "No items liked" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        msg: "Likes fetched successfully",
        likes, // This contains both itemIds and total count per itemType (product or prompt)
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error while fetching likes ==> ", error);

    return NextResponse.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST: Add a new like
export async function POST(req: NextRequest) {
  await connectDB();

  const token = await getToken({ req: req });

  if (!token || token?._id === undefined) {
    return NextResponse.json(
      { success: false, msg: "Unauthorized access" },
      { status: 400 }
    );
  }

  try {
    const { itemId, itemType } = await req.json(); // Extracting itemId and itemType from the request body
    console.log("itemId server ==> ", itemId, itemType);

    const user = await UserModel.findOne({ email: token?.email });

    if (!user) {
      return NextResponse.json(
        { success: false, msg: "User does not exist" },
        { status: 404 }
      );
    }

    // Check if like for this itemId and itemType already exists
    const likeExisting = await LikeModel.findOne({
      userId: user._id,
      itemId,
      itemType,
    });

    if (likeExisting) {
      return NextResponse.json(
        { success: true, msg: `Already liked this ${itemType}` },
        { status: 200 }
      );
    }

    // Create a new like
    const like = new LikeModel({
      itemId,
      itemType,
      userId: new mongoose.Types.ObjectId(user._id),
    });

    const savedLiked = await like.save();

    if (!savedLiked) {
      return NextResponse.json(
        { success: false, msg: `Failed to like ${itemType}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, msg: `${itemType} liked successfully`, like },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error while liking ==> ", error);

    return NextResponse.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a like
export async function DELETE(req: NextRequest) {
  await connectDB();

  const token = await getToken({ req: req });

  if (!token) {
    return NextResponse.json(
      { success: false, msg: "Unauthorized access" },
      { status: 400 }
    );
  }

  try {
    const { itemId, itemType } = await req.json(); // Extracting itemId and itemType from the request body
    const user = await UserModel.findOne({ email: token?.email });

    if (!user) {
      return NextResponse.json(
        { success: false, msg: "User does not exist" },
        { status: 404 }
      );
    }

    // Attempt to delete the like
    const deleteLike = await LikeModel.deleteOne({
      userId: user._id,
      itemId,
      itemType,
    });

    if (deleteLike.deletedCount === 0) {
      return NextResponse.json({
        success: true,
        msg: `${itemType} already deleted or does not exist in likes`,
      });
    }

    return NextResponse.json(
      { success: true, msg: `${itemType} deleted from likes successfully` },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error while deleting like ==> ", error);
    return NextResponse.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}
