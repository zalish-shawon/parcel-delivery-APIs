import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { loginSchema, registerSchema } from './auth.validation';

export const register = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);
    const user = await AuthService.register(data.name, data.email, data.password, data.role);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body);
    const { token, user } = await AuthService.login(data.email, data.password);
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
