import express from 'express';
import { register, login } from './auth.controller';
import { authMiddleware } from '../common/middleware/auth.middleware';
import { logout } from '../admin/admin.controller';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware(['admin', 'sender', 'receiver']), logout);
export default router;
