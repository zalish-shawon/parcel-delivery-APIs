import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/parcel_db',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  feeBase: 50, // base fee
  feePerKg: 20, // additional per kg
};