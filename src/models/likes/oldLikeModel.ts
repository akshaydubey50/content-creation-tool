import mongoose, { Schema } from "mongoose";
import Like from "./Like.model";

export interface OldLike extends Document {
  userId: Schema.Types.ObjectId;
  productId: string;
  migrated?: boolean;
}

const likeSchema: Schema<OldLike> = new Schema({
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

const LikeModel =
  (mongoose.models.Like as mongoose.Model<OldLike>) ||
  mongoose.model<OldLike>("Like", likeSchema);

export default LikeModel;
