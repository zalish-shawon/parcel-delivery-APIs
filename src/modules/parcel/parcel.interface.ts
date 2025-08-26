import { Types } from "mongoose";

export interface IStatusLog {
  status: string; // e.g., Requested, Dispatched, Delivered
  note?: string;
  updatedBy: string; // userId (admin or system)
  timestamp: Date;
}

export interface IParcel {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  trackingId: string;
  weight: number;
  address: string;
  fee: number;
  status: string;
  isBlocked?: boolean;
  statusLogs: IStatusLog[];
  createdAt?: Date;
  updatedAt?: Date;
}



