"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../common/middleware/auth.middleware");
const router = express_1.default.Router();
router.get('/', (0, auth_middleware_1.authMiddleware)(['admin']), user_controller_1.getAllUsers);
router.get('/:id', (0, auth_middleware_1.authMiddleware)(['admin']), user_controller_1.getUserById);
router.patch('/block/:id', (0, auth_middleware_1.authMiddleware)(['admin']), user_controller_1.blockUser);
router.patch('/unblock/:id', (0, auth_middleware_1.authMiddleware)(['admin']), user_controller_1.unblockUser);
exports.default = router;
