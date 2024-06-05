import mongoose, { Schema } from 'mongoose';
import { z } from 'zod';

const userSchemaDefinition = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const userSchema = new Schema<(typeof userSchemaDefinition)['_type']>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
