import mongoose, { Model, Schema } from "mongoose";
import { IRole } from "../interfaces/Roles";

export const RoleModel: Model<IRole> = mongoose.model<IRole>(
  "Role",
  new Schema<IRole>({
    name: { type: String, required: true },
    permissions: [{ type: String, required: true }],
  })
);
