import { Order } from './../order.model';
import { TOrder } from './order.interface';

const createOrder = async (OrderData: TOrder) => {
  const result = await Order.create(OrderData);
  return result;
};
const getOrderByName = async (email: string) => {
  const order = await Order.findOne({ email });
  if (!order) {
    throw new Error(' not found');
  }
  return order;
};

const getAllOrders = async () => {
  return await Order.find();
};

export const orderServices = { getAllOrders, createOrder, getOrderByName };
