import mongoose, { Schema } from "mongoose";

export interface User extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  refreshToken: string;
}

const UserSchema: Schema<User> = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  refreshToken: {
    type: String,
    default: "",
  },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
