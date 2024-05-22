import { Order } from './../order.model';
import { TOrder } from './order.interface';

const createOrder = async (OrderData: TOrder) => {
  const result = await Order.create(OrderData);
  return result;
};

const getAllOrders = async () => {
  return await Order.find();
};

export const orderServices = { getAllOrders, createOrder };
