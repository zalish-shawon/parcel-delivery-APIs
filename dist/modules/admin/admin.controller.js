"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getAllUsers = exports.getAllParcels = exports.unblockUser = exports.blockUser = void 0;
const user_model_1 = require("../user/user.model");
const parcel_model_1 = require("../parcel/parcel.model");
const blockUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await user_model_1.UserModel.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User blocked successfully', user });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.blockUser = blockUser;
const unblockUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await user_model_1.UserModel.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User unblocked successfully', user });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.unblockUser = unblockUser;
const getAllParcels = async (req, res) => {
    try {
        const parcels = await parcel_model_1.ParcelModel.find().populate('sender receiver');
        res.json(parcels);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getAllParcels = getAllParcels;
const getAllUsers = async (req, res) => {
    try {
        const users = await user_model_1.UserModel.find();
        res.json(users);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getAllUsers = getAllUsers;
const logout = async (req, res) => {
    try {
        // In a real app, you could push the token to a blacklist database
        res.status(200).json({ message: 'Logged out successfully. Please remove token from client.' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.logout = logout;
