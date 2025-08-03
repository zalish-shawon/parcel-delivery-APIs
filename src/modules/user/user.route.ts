import express from 'express';
import { getAllUsers, getUserById, blockUser, unblockUser } from './user.controller';
import { authMiddleware } from '../common/middleware/auth.middleware';

const router = express.Router();

router.get('/', authMiddleware(['admin']), getAllUsers);
router.get('/:id', authMiddleware(['admin']), getUserById);
router.patch('/block/:id', authMiddleware(['admin']), blockUser);
router.patch('/unblock/:id', authMiddleware(['admin']), unblockUser);
export default router;


