import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOtp extends Document {
  email: string;
  code: string;
  verified: boolean;
  createdAt: Date;
}

const OtpSchema: Schema<IOtp> = new Schema({
  email: { type: String, required: true, lowercase: true, trim: true },
  code: { type: String, required: true },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, index: { expires: 300 } }, // Automatically deleted after 5 minutes
});

const Otp: Model<IOtp> = mongoose.models.Otp || mongoose.model<IOtp>("Otp", OtpSchema);
export default Otp;
