import mongoose, { Schema } from "mongoose";

export interface Like extends Document {
  userId: Schema.Types.ObjectId;
  productId: string;
}

const likeSchema: Schema<Like> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  productId: {
    type: String,
    required: [true, "Product id is required"],
  },
});

const LikeModel =
  (mongoose.models.Like as mongoose.Model<Like>) ||
  mongoose.model<Like>("Like", likeSchema);

export default LikeModel;
