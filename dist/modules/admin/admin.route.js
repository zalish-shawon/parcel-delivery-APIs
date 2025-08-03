"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const auth_middleware_1 = require("../common/middleware/auth.middleware");
const router = express_1.default.Router();
router.patch('/users/block/:id', (0, auth_middleware_1.authMiddleware)(['admin']), admin_controller_1.blockUser);
router.patch('/users/unblock/:id', (0, auth_middleware_1.authMiddleware)(['admin']), admin_controller_1.unblockUser);
router.get('/parcels', (0, auth_middleware_1.authMiddleware)(['admin']), admin_controller_1.getAllParcels);
router.get('/users', (0, auth_middleware_1.authMiddleware)(['admin']), admin_controller_1.getAllUsers);
exports.default = router;
