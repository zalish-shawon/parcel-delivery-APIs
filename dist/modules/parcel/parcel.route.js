"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const parcel_controller_1 = require("./parcel.controller");
const auth_middleware_1 = require("../common/middleware/auth.middleware");
const router = express_1.default.Router();
router.post('/', (0, auth_middleware_1.authMiddleware)(['sender', 'admin']), parcel_controller_1.createParcel);
router.get('/me', (0, auth_middleware_1.authMiddleware)(['sender']), parcel_controller_1.getMyParcels);
router.get('/incoming', (0, auth_middleware_1.authMiddleware)(['receiver']), parcel_controller_1.getIncomingParcels);
router.patch('/cancel/:id', (0, auth_middleware_1.authMiddleware)(['sender']), parcel_controller_1.cancelParcel);
router.patch('/status/:id', (0, auth_middleware_1.authMiddleware)(['admin']), parcel_controller_1.updateParcelStatus);
exports.default = router;
