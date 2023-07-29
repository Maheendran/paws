import mongoose, { Document, Schema } from "mongoose";

export interface GroomInterface extends Document {
  shopName: string;
  ownerName: string;
  email: string;
  mobile: string;
  password: string;
  verified: boolean;
  profileImage: string;
  upi: string;
  wallet: string;
  otp: string;
  accountType: string;
  createdBy: string;
  blocked: boolean;
}

const groomSchema: Schema = new Schema({
  accountType: {
    type: String,
    required: true,
  },
  shopName: {
    type: String,
    default: "",
  },
  ownerName: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    default: "",
  },
  password: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  profileImage: {
    type: String,
    default: "",
  },
  upi: {
    type: String,
    default: "",
  },
  wallet: {
    type: Number,
    default: 0,
  },
  otp: {
    type: String,
    default: "",
  },
  createdBy: {
    type: String,
    default: "manual",
  },
  blocked: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<GroomInterface>("Groom", groomSchema);
