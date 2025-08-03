"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIncomingParcels = exports.getMyParcels = exports.updateParcelStatus = exports.cancelParcel = exports.createParcel = void 0;
const parcel_service_1 = require("./parcel.service");
const parcel_validation_1 = require("./parcel.validation");
const createParcel = async (req, res) => {
    try {
        const data = parcel_validation_1.parcelCreateSchema.parse(req.body);
        const userId = req.user.id;
        const parcel = await parcel_service_1.ParcelService.createParcel(userId, data.receiverId, data.weight, data.address);
        res.status(201).json({ message: 'Parcel created successfully', parcel });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createParcel = createParcel;
const cancelParcel = async (req, res) => {
    try {
        const parcelId = req.params.id;
        const userId = req.user.id;
        const parcel = await parcel_service_1.ParcelService.cancelParcel(parcelId, userId);
        res.status(200).json({ message: 'Parcel cancelled successfully', parcel });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.cancelParcel = cancelParcel;
const updateParcelStatus = async (req, res) => {
    try {
        const parcelId = req.params.id;
        const { status, note } = req.body;
        const userId = req.user.id;
        const parcel = await parcel_service_1.ParcelService.updateStatus(parcelId, status, userId, note);
        res.status(200).json({ message: 'Parcel status updated', parcel });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateParcelStatus = updateParcelStatus;
const getMyParcels = async (req, res) => {
    try {
        const userId = req.user.id;
        const parcels = await parcel_service_1.ParcelService.getUserParcels(userId);
        res.status(200).json(parcels);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getMyParcels = getMyParcels;
const getIncomingParcels = async (req, res) => {
    try {
        const userId = req.user.id;
        const parcels = await parcel_service_1.ParcelService.getReceiverParcels(userId);
        res.status(200).json(parcels);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getIncomingParcels = getIncomingParcels;
