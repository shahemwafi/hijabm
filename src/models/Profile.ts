import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IProfile extends Document {
  name: string;
  gender: 'male' | 'female';
  age: number;
  maritalStatus: string;
  height: string;
  country: string;
  city: string;
  description: string;
  imageUrl: string;
  status: 'pending' | 'approved' | 'rejected' | 'hidden';
  createdAt: Date;
}

const ProfileSchema = new Schema<IProfile>({
  name: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  age: { type: Number, required: true },
  maritalStatus: { type: String, required: true },
  height: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'hidden'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default models.Profile || model<IProfile>('Profile', ProfileSchema); 