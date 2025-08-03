"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/parcel_db',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    feeBase: 50, // base fee
    feePerKg: 20, // additional per kg
};
