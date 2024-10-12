// import mongoose, { Schema } from "mongoose";

// export interface Like extends Document {
//   userId: Schema.Types.ObjectId;
//   productId: string;
// }

// const likeSchema: Schema<Like> = new Schema({
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//   },
//   productId: {
//     type: String,
//     required: [true, "Product id is required"],
//   },
// });

// const LikeModel =
//   (mongoose.models.Like as mongoose.Model<Like>) ||
//   mongoose.model<Like>("Like", likeSchema);

// export default LikeModel;

import mongoose, { Schema, Document } from "mongoose";

export interface Like extends Document {
  userId: Schema.Types.ObjectId;
  itemId: string;
  itemType: "tool" | "prompt"; // Define different types of items a user can like
}

const likeSchema: Schema<Like> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  itemId: {
    type: String,
    required: [true, "Item ID is required"],
  },
  itemType: {
    type: String,
    enum: ["tool", "prompt"], // Restrict itemType to specific values
    required: [true, "Item type is required"],
  },
});

const LikeModel =
  (mongoose.models.Like as mongoose.Model<Like>) ||
  mongoose.model<Like>("Like", likeSchema);

export default LikeModel;
