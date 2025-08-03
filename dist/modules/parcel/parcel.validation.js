"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parcelCreateSchema = void 0;
const zod_1 = require("zod");
exports.parcelCreateSchema = zod_1.z.object({
    receiverId: zod_1.z.string().min(1),
    weight: zod_1.z.number().min(0.1),
    address: zod_1.z.string().min(1)
});
