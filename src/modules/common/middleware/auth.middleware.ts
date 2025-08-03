import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../../config';

export const authMiddleware = (roles?: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
      const decoded = jwt.verify(token, config.jwtSecret) as any;
      (req as any).user = decoded;
      if (roles && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};