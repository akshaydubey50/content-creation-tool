import mongoose, { Schema } from "mongoose";
import Bookmark from "./Bookmark.model";

export interface OldBookmark extends Document {
  userId: Schema.Types.ObjectId;
  productId: string;
  migrated?: boolean; // Optional field to track migration status
}

const oldBookmarkSchema: Schema<OldBookmark> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  productId: {
    type: String,
    // required: [true, "Product id is required"],
  },
  migrated: {
    type: Boolean,
    default: false, // Set default to false
  },
});

const OldBookmarkModel =
  (mongoose.models.Bookmark as mongoose.Model<OldBookmark>) ||
  mongoose.model<OldBookmark>("Bookmark", oldBookmarkSchema);

export default OldBookmarkModel;
