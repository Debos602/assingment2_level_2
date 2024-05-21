import { z } from 'zod';

// Define the variant schema
const variantValidationSchema = z.object({
  type: z.string().nonempty('Type is required'),
  value: z.string().nonempty('Value is required'),
});

// Define the inventory schema
const inventoryValidationSchema = z.object({
  quantity: z
    .number()
    .int()
    .nonnegative('Quantity must be a non-negative integer'),
  inStock: z.boolean(),
});

// Define the product schema
const productValidationSchema = z.object({
  name: z.string().nonempty('Name is required'),
  description: z.string().nonempty('Description is required'),
  price: z.number().positive('Price must be a positive number'),
  category: z.string().nonempty('Category is required'),
  tags: z
    .array(z.string())
    .nonempty('Tags must include at least one tag')
    .default(['Smartphone', 'Apple', 'iOS']),
  variants: z.array(variantValidationSchema).optional(),
  inventory: inventoryValidationSchema,
});

// Export the product schema
export default productValidationSchema;
