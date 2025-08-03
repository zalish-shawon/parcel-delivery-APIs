"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_model_1 = require("../user/user.model");
const bcrypt_1 = require("../common/utils/bcrypt");
const jwt_1 = require("../common/utils/jwt");
exports.AuthService = {
    async register(name, email, password, role) {
        const hash = await (0, bcrypt_1.hashPassword)(password);
        const user = await user_model_1.UserModel.create({ name, email, password: hash, role });
        return user;
    },
    async login(email, password) {
        const user = await user_model_1.UserModel.findOne({ email });
        if (!user)
            throw new Error('User not found');
        if (user.isBlocked)
            throw new Error('User is blocked');
        const isMatch = await (0, bcrypt_1.comparePassword)(password, user.password);
        if (!isMatch)
            throw new Error('Invalid credentials');
        const token = (0, jwt_1.generateToken)({ id: user._id, role: user.role });
        return { token, user };
    }
};
