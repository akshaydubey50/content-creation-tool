import mongoose, { Schema } from "mongoose";

export interface User extends Document {
  email: string;
  password: string;
  /*  firstName: string;
  lastName: string; */
  forgetPasswordToken: string;
  forgetPasswordTokenExpiry: Date;
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
}

const UserSchema: Schema<User> = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  // firstName: {
  //   type: String,
  //   // required: [true, "First name is required"],
  // },
  // lastName: {
  //   type: String,
  //   // required: [true, "Last name is required"],
  // },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  forgetPasswordToken: {
    type: String,
    default: "",
  },
  forgetPasswordTokenExpiry: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyCode: {
    type: String,
    required: [true, "Verify code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "VerifyCodeExpiry is required"],
  },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
