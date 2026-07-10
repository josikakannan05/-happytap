import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICard extends Document {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  colorName: string;
  fullDescription?: string;
  rating?: number;
  reviewsCount?: number;
  features?: {
    nfcEnabled?: boolean;
    instantSharing?: boolean;
    noAppRequired?: boolean;
    worksEverywhere?: boolean;
  };
  images?: {
    main?: string;
    front?: string;
    back?: string;
    side?: string | null;
  };
  cardStyle?: {
    background?: string;
    logoStyle?: "gold" | "silver" | "white" | "rose";
    sideCoreClass?: string;
    border?: string;
  };
  isTeamLayout?: boolean;
  createdAt: Date;
}

const CardSchema: Schema<ICard> = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    colorName: { type: String, required: true },
    fullDescription: { type: String },
    rating: { type: Number, default: 4.9 },
    reviewsCount: { type: Number, default: 128 },
    features: {
      nfcEnabled: { type: Boolean, default: true },
      instantSharing: { type: Boolean, default: true },
      noAppRequired: { type: Boolean, default: true },
      worksEverywhere: { type: Boolean, default: true },
    },
    images: {
      main: { type: String },
      front: { type: String },
      back: { type: String },
      side: { type: String, default: null },
    },
    cardStyle: {
      background: { type: String },
      logoStyle: { type: String, enum: ["gold", "silver", "white", "rose"], default: "silver" },
      sideCoreClass: { type: String },
      border: { type: String },
    },
    isTeamLayout: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Card: Model<ICard> = mongoose.models.Card || mongoose.model<ICard>("Card", CardSchema);
export default Card;
