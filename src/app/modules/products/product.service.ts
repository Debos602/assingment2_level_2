import { Order } from '../order.model';
import { TOrder } from '../orders/order.interface';
import { Product } from '../product.model';
import { TProducts } from './products.interface';

const createProduct = async (productData: TProducts) => {
  // const result = await Product.create(productData);
  // return result;

  const product = new Product(productData);

  const result = await product.save(); // built in instance method
  return result;
};
const createOrder = async (OrderData: TOrder) => {
  const result = await Order.create(OrderData);
  console.log(result);
  return result;

  // const product = new Product(productData);

  // const result = await product.save(); // built in instance method
  // return result;
};
const getProductByName = async (searchTerm: string) => {
  const product = await Product.findOne({ name: searchTerm });
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

const getAllProducts = async () => {
  return await Product.find();
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
const deleteProductFromDb = async (_id: string) => {
  const result = await Product.deleteOne({ _id });
  return result;
};

export const ProductServices = {
  createProduct,
  getAllProducts,
  getSingleProductFromdb,
  updateProductFromDb,
  deleteProductFromDb,
  getProductByName,
  createOrder,
};
