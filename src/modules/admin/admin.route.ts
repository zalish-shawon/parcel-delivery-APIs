import express from 'express';
import { blockUser, unblockUser, getAllParcels, getAllUsers } from './admin.controller';
import { authMiddleware } from '../common/middleware/auth.middleware';

const router = express.Router();
router.patch('/users/block/:id', authMiddleware(['admin']), blockUser);
router.patch('/users/unblock/:id', authMiddleware(['admin']), unblockUser);
router.get('/parcels', authMiddleware(['admin']), getAllParcels);
router.get('/users', authMiddleware(['admin']), getAllUsers);

export default router;