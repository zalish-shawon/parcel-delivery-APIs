"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_service_1 = require("./auth.service");
const auth_validation_1 = require("./auth.validation");
const register = async (req, res) => {
    try {
        const data = auth_validation_1.registerSchema.parse(req.body);
        const user = await auth_service_1.AuthService.register(data.name, data.email, data.password, data.role);
        res.status(201).json({ message: 'User registered successfully', user });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const data = auth_validation_1.loginSchema.parse(req.body);
        const { token, user } = await auth_service_1.AuthService.login(data.email, data.password);
        res.status(200).json({ message: 'Login successful', token, user });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.login = login;
