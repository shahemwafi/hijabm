import { Document, model, models, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  isAdmin?: boolean;
  resetToken?: string;
  resetTokenExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
  },
  { timestamps: true }
);

export default models.User || model<IUser>("User", UserSchema);