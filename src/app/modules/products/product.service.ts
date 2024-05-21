import { Product } from '../product.model';
import { TProducts } from './products.interface';

const createProduct = async (productData: TProducts) => {
  const result = await Product.create(productData);
  return result;
};
const getAllProducts = async () => {
  const result = await Product.find();
  return result;
};
const getSingleProductFromdb = async (_id: string) => {
  const result = await Product.findOne({ _id });

  return result;
};
export const ProductServices = {
  createProduct,
  getAllProducts,
  getSingleProductFromdb,
};
