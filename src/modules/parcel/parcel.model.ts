import mongoose, { Schema, model, HydratedDocument } from "mongoose";
import { IParcel } from "./parcel.interface";

export type IParcelDocument = HydratedDocument<IParcel>;

const StatusLogSchema = new Schema(
  {
    status: { type: String, required: true },
    note: { type: String },
    updatedBy: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const ParcelSchema = new Schema<IParcel>(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    trackingId: { type: String, required: true, unique: true },
    weight: { type: Number, required: true },
    address: { type: String, required: true },
    fee: { type: Number, required: true },
    status: { type: String, default: "Requested" },
    isBlocked: { type: Boolean, default: false },
    statusLogs: { type: [StatusLogSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

export const ParcelModel = model<IParcel>("Parcel", ParcelSchema);
