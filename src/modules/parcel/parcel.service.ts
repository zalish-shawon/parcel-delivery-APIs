import { ParcelModel } from './parcel.model';
import { config } from '../../config';
import { UserModel } from '../user/user.model';
import mongoose from 'mongoose';

export const ParcelService = {
  async createParcel(senderId: string, receiverId: string, weight: number, address: string) {
    const sender = await UserModel.findById(senderId);
    const receiver = await UserModel.findById(receiverId);
    if (!sender || !receiver) throw new Error('Sender or receiver not found');

    const trackingId = `TRK-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 1000000)}`;
    const fee = config.feeBase + config.feePerKg * weight;
    const parcel = await ParcelModel.create({
      trackingId,
      sender: sender,
      receiver: receiver,
      weight,
      address,
      fee,
      statusLogs: [{ status: 'Requested', updatedBy: senderId, timestamp: new Date() }]
    });
    return parcel;
  },

  async updateStatus(parcelId: string, status: string, userId: string, note?: string) {
    const parcel = await ParcelModel.findById(parcelId);
    if (!parcel) throw new Error('Parcel not found');
    parcel.status = status;
    parcel.statusLogs.push({ status, updatedBy: userId, note, timestamp: new Date() });
    await parcel.save();
    return parcel;
  },

  async getUserParcels(userId: string) {
    return ParcelModel.find({ sender: userId });
  },

async getReceiverParcels(userId: string) {
  return ParcelModel.find({ receiver: new mongoose.Types.ObjectId(userId) })
    .populate('sender', 'name email role')
    .populate('receiver', 'name email role');
},

  async cancelParcel(parcelId: string, senderId: string) {
    const parcel = await ParcelModel.findOne({ _id: parcelId, sender: senderId });
    if (!parcel) throw new Error('Parcel not found or not owned by sender');
    if (parcel.status !== 'Requested') throw new Error('Cannot cancel dispatched parcel');
    parcel.status = 'Cancelled';
    parcel.statusLogs.push({ status: 'Cancelled', updatedBy: senderId, timestamp: new Date() });
    await parcel.save();
    return parcel;
  }
};
