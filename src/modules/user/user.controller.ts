import { Request, Response } from "express";
import { UserService } from "./user.service";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserService.findUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const blockUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.blockUser(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User blocked", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const unblockUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.unblockUser(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User unblocked", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
