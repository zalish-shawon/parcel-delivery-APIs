"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unblockUser = exports.blockUser = exports.getUserById = exports.getAllUsers = void 0;
const user_service_1 = require("./user.service");
const getAllUsers = async (req, res) => {
    try {
        const users = await user_service_1.UserService.getAllUsers();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    try {
        const user = await user_service_1.UserService.findUserById(req.params.id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getUserById = getUserById;
const blockUser = async (req, res) => {
    try {
        const user = await user_service_1.UserService.blockUser(req.params.id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User blocked', user });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.blockUser = blockUser;
const unblockUser = async (req, res) => {
    try {
        const user = await user_service_1.UserService.unblockUser(req.params.id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User unblocked', user });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.unblockUser = unblockUser;
