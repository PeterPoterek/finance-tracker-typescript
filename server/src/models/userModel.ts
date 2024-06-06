import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { z } from "zod";

const userSchemaDefinition = z.object({
  username: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().email(),
  password: z.string().min(6),
  isVerified: z.boolean().optional(),
  avatarURL: z.string().url().optional(),
});

interface UserSchema extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  avatarURL?: string;
  createdAt: Date;
}

const userSchema = new Schema<UserSchema>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  avatarURL: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre<UserSchema>("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password.trim(), salt);
  }
  next();
});

const UserModel = mongoose.model<UserSchema>("User", userSchema);

export { UserModel, userSchemaDefinition };
