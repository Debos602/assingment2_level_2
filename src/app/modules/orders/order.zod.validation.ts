import { z } from 'zod';

const orderSchema = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
});

export default orderSchema;
