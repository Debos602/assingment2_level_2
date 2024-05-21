import { Product } from '../product.model';
import { TProducts } from './products.interface';

const createProduct = async (productData: TProducts) => {
  // const result = await Product.create(productData);
  // return result;

  const product = new Product(productData);

  const result = await product.save(); // built in instance method
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
const updateProductFromDb = async (_id: string, productData: TProducts) => {
  const result = await Product.findByIdAndUpdate(_id, productData, {
    new: true,
  });
  return result;
};
const deleteProductFromDb = async (productData: TProducts) => {
  const result = await Product.deleteMany(productData);
  return result;
};
export const ProductServices = {
  createProduct,
  getAllProducts,
  getSingleProductFromdb,
  updateProductFromDb,
  deleteProductFromDb,
};
