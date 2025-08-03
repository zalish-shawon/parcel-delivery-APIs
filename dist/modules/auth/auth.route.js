"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("../common/middleware/auth.middleware");
const admin_controller_1 = require("../admin/admin.controller");
const router = express_1.default.Router();
router.post('/register', auth_controller_1.register);
router.post('/login', auth_controller_1.login);
router.post('/logout', (0, auth_middleware_1.authMiddleware)(['admin', 'sender', 'receiver']), admin_controller_1.logout);
exports.default = router;
