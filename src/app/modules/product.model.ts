import { Schema, model } from 'mongoose';
import {
  TInventory,
  TProductVariant,
  TProducts,
} from './products/products.interface';

const varientSchema = new Schema<TProductVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const productsSchema = new Schema<TProducts>({
  name: { type: String, required: [true, 'Name is required'] },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: ['Smartphone', 'Apple', 'iOS'],
  variants: [varientSchema],
  inventory: inventorySchema,
});

export const Product = model<TProducts>('Product', productsSchema);
