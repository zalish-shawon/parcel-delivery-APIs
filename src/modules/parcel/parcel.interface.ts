import { Types } from "mongoose";

export interface IStatusLog {
  status: string; // e.g., Requested, Dispatched, Delivered
  note?: string;
  updatedBy: string; // userId (admin or system)
  timestamp: Date;
}

export interface IParcel {
  sender: Types.ObjectId;    // <--- updated
  receiver: Types.ObjectId;   // reference to receiver user
  trackingId: string;  // unique tracking code
  weight: number;      // in kg
  address: string;     // delivery address
  fee: number;         // calculated fee based on weight/distance
  status: string;      // current status
  isBlocked?: boolean; // admin may block
  statusLogs: IStatusLog[];
  createdAt?: Date;
  updatedAt?: Date;
}
