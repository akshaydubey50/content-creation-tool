import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import UserModel from "@/models/user/User.model";
import connectDB from "@/db/dbConnect";
import BookmarkModel from "@/models/bookmark/Bookmark.model";
import mongoose from "mongoose";

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
    console.log("itemId seerveer ==> ", itemId, itemType);
    const user = await UserModel.findOne({ email: token?.email });

    if (!user) {
      return NextResponse.json(
        { success: false, msg: "User does not exist" },
        { status: 404 }
      );
    }

    // Check if bookmark for this itemId and itemType already exists
    const bookmarkExisting = await BookmarkModel.findOne({
      userId: user._id,
      itemId,
      itemType,
    });

    if (bookmarkExisting) {
      return NextResponse.json(
        { success: true, msg: `Already bookmarked this ${itemType}` },
        { status: 200 }
      );
    }

    // Create a new bookmark
    const bookmark = new BookmarkModel({
      itemId,
      itemType,
      userId: new mongoose.Types.ObjectId(user._id),
    });

    const savedBookmarked = await bookmark.save();

    if (!savedBookmarked) {
      return NextResponse.json(
        { success: false, msg: `Failed to bookmark ${itemType}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, msg: `${itemType} bookmarked successfully`, bookmark },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error while bookmarking ==> ", error);

    return NextResponse.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}
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

    // Attempt to delete the bookmark
    const deleteBookmark = await BookmarkModel.deleteOne({
      userId: user._id,
      itemId,
      itemType,
    });

    if (deleteBookmark.deletedCount === 0) {
      return NextResponse.json({
        success: true,
        msg: `${itemType} already deleted or does not exist in bookmarks`,
      });
    }

    return NextResponse.json(
      { success: true, msg: `${itemType} deleted from bookmarks successfully` },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error while deleting bookmark ==> ", error);
    return NextResponse.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}
