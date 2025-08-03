"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelService = void 0;
const parcel_model_1 = require("./parcel.model");
const config_1 = require("../../config");
const user_model_1 = require("../user/user.model");
const mongoose_1 = __importDefault(require("mongoose"));
exports.ParcelService = {
    async createParcel(senderId, receiverId, weight, address) {
        const sender = await user_model_1.UserModel.findById(senderId);
        const receiver = await user_model_1.UserModel.findById(receiverId);
        if (!sender || !receiver)
            throw new Error('Sender or receiver not found');
        const trackingId = `TRK-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 1000000)}`;
        const fee = config_1.config.feeBase + config_1.config.feePerKg * weight;
        const parcel = await parcel_model_1.ParcelModel.create({
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
    async updateStatus(parcelId, status, userId, note) {
        const parcel = await parcel_model_1.ParcelModel.findById(parcelId);
        if (!parcel)
            throw new Error('Parcel not found');
        parcel.status = status;
        parcel.statusLogs.push({ status, updatedBy: userId, note, timestamp: new Date() });
        await parcel.save();
        return parcel;
    },
    async getUserParcels(userId) {
        return parcel_model_1.ParcelModel.find({ sender: userId });
    },
    async getReceiverParcels(userId) {
        return parcel_model_1.ParcelModel.find({ receiver: new mongoose_1.default.Types.ObjectId(userId) })
            .populate('sender', 'name email role')
            .populate('receiver', 'name email role');
    },
    async cancelParcel(parcelId, senderId) {
        const parcel = await parcel_model_1.ParcelModel.findOne({ _id: parcelId, sender: senderId });
        if (!parcel)
            throw new Error('Parcel not found or not owned by sender');
        if (parcel.status !== 'Requested')
            throw new Error('Cannot cancel dispatched parcel');
        parcel.status = 'Cancelled';
        parcel.statusLogs.push({ status: 'Cancelled', updatedBy: senderId, timestamp: new Date() });
        await parcel.save();
        return parcel;
    }
};
