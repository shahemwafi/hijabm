import { Document, model, models, Schema, Types } from "mongoose";

export interface IProfile extends Document {
  // Personal Information
  name: string;
  gender: "male" | "female";
  age: number;
  maritalStatus: string;
  height: string;
  weight?: string;
  color?: string;
  disability?: string;
  nationality: string;
  
  // Education Details
  qualification?: string;
  college?: string;
  university?: string;
  
  // Job Details
  rank?: string;
  income?: string;
  natureOfJob?: string;
  futurePlans?: string;
  
  // Religion Details
  religion?: string;
  caste?: string;
  sect?: string;
  
  // Property Details
  home?: string;
  size?: string;
  propertyLocation?: string;
  otherProperties?: string;
  
  // Family Details
  fatherOccupation?: string;
  motherOccupation?: string;
  brothers?: string;
  sisters?: string;
  marriedSiblings?: string;
  
  // Address
  currentCity: string;
  homeTown?: string;
  addressLocation?: string;
  
  // Requirements
  reqAgeLimit?: string;
  reqHeight?: string;
  reqCity?: string;
  reqCaste?: string;
  reqQualification?: string;
  reqOther?: string;
  
  // Other fields
  description: string;
  imageUrl: string;
  status: "pending" | "approved" | "rejected" | "hidden";
  AccountHolder?: string;
  paymentStatus: "pending" | "paid";
  paymentScreenshot?: string;
  user?: Types.ObjectId;
  createdAt: Date;
}

const ProfileSchema = new Schema<IProfile>({
  // Personal Information
  name: { type: String, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  age: { type: Number, required: true },
  maritalStatus: { type: String, required: true },
  height: { type: String, required: true },
  weight: { type: String },
  color: { type: String },
  disability: { type: String },
  nationality: { type: String, required: true },
  
  // Education Details
  qualification: { type: String },
  college: { type: String },
  university: { type: String },
  
  // Job Details
  rank: { type: String },
  income: { type: String },
  natureOfJob: { type: String },
  futurePlans: { type: String },
  
  // Religion Details
  religion: { type: String },
  caste: { type: String },
  sect: { type: String },
  
  // Property Details
  home: { type: String },
  size: { type: String },
  propertyLocation: { type: String },
  otherProperties: { type: String },
  
  // Family Details
  fatherOccupation: { type: String },
  motherOccupation: { type: String },
  brothers: { type: String },
  sisters: { type: String },
  marriedSiblings: { type: String },
  
  // Address
  currentCity: { type: String, required: true },
  homeTown: { type: String },
  addressLocation: { type: String },
  
  // Requirements
  reqAgeLimit: { type: String },
  reqHeight: { type: String },
  reqCity: { type: String },
  reqCaste: { type: String },
  reqQualification: { type: String },
  reqOther: { type: String },
  
  // Other fields
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "hidden"],
    default: "pending",
  },
  AccountHolder: { type: String },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
  paymentScreenshot: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export default models.Profile || model<IProfile>("Profile", ProfileSchema);
