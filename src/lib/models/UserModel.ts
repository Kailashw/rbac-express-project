import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "../interfaces/User";

export const UserModel: Model<IUser> = mongoose.model<IUser>(
  "User",
  new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: [{ type: Schema.Types.String, ref: "Role" }],
  })
);
