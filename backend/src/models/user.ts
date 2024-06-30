import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  bio: string;
  profilePicture: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  bio: { type: String, required: true },
  profilePicture: { type: String, required: true },
});

export const User = model<IUser>('User', userSchema);
