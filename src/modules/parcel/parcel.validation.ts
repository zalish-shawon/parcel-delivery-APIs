import { z } from 'zod';
export const parcelCreateSchema = z.object({
  receiverId: z.string().min(1),
  weight: z.number().min(0.1),
  address: z.string().min(1)
});