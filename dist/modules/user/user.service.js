"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("./user.model");
const bcrypt_1 = require("../common/utils/bcrypt");
exports.UserService = {
    async createUser(userData) {
        const hash = await (0, bcrypt_1.hashPassword)(userData.password);
        const user = await user_model_1.UserModel.create({ ...userData, password: hash });
        return user;
    },
    async findUserByEmail(email) {
        return user_model_1.UserModel.findOne({ email });
    },
    async findUserById(id) {
        return user_model_1.UserModel.findById(id);
    },
    async getAllUsers() {
        return user_model_1.UserModel.find();
    },
    async blockUser(id) {
        return user_model_1.UserModel.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
    },
    async unblockUser(id) {
        return user_model_1.UserModel.findByIdAndUpdate(id, { isBlocked: false }, { new: true });
    }
};
