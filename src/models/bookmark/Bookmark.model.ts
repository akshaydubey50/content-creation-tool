import mongoose, { Schema } from "mongoose";

export interface Bookmark extends Document {
  userId: Schema.Types.ObjectId;
  productId: string;
}

const bookmarkSchema: Schema<Bookmark> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  productId: {
    type: String,
    required: [true, "Product id is required"],
  },
});

const BookmarkModel =
  (mongoose.models.Bookmark as mongoose.Model<Bookmark>) ||
  mongoose.model<Bookmark>("Bookmark", bookmarkSchema);

export default BookmarkModel;
