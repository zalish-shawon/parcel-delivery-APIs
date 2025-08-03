"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../config");
const authMiddleware = (roles) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token)
            return res.status(401).json({ message: 'No token provided' });
        try {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
            req.user = decoded;
            if (roles && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            next();
        }
        catch {
            return res.status(401).json({ message: 'Invalid token' });
        }
    };
};
exports.authMiddleware = authMiddleware;
