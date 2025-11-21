import { z } from 'zod';

export const customerInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number is too long')
    .regex(/^[0-9+\-\s()]+$/, 'Invalid phone number format'),
  email: z.string().email('Invalid email address').or(z.literal('')).optional(),
});