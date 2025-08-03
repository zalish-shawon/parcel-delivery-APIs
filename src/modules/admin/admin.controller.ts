import { Request, Response } from 'express';
import { UserModel } from '../user/user.model';
import { ParcelModel } from '../parcel/parcel.model';

export const blockUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User blocked successfully', user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const unblockUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User unblocked successfully', user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllParcels = async (req: Request, res: Response) => {
  try {
    const parcels = await ParcelModel.find().populate('sender receiver');
    res.json(parcels);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // In a real app, you could push the token to a blacklist database
    res.status(200).json({ message: 'Logged out successfully. Please remove token from client.' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};