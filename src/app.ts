import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './modules/auth/auth.route';
import parcelRoutes from './modules/parcel/parcel.route';
import adminRoutes from './modules/admin/admin.route';
import userRoutes from './modules/user/user.route';
import { errorMiddleware } from './modules/common/middleware/error.middleware';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/parcels', parcelRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'Parcel Delivery API is running 🚀' });
});

app.use(errorMiddleware);
export default app;
