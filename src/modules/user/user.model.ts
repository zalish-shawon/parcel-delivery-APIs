import { Schema, model, HydratedDocument } from "mongoose";
import { IUser } from "./user.interface";

export type IUserDocument = HydratedDocument<IUser>;

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "sender", "receiver"],
      required: true,
    },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<IUser>("User", UserSchema);
