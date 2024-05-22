import { Order } from '../order.model';
import { TOrder } from './order.interface';

const createOrder = async (orderData: TOrder) => {
  const order = new Order(orderData);
  const result = await order.save();
  return result;
};
export const OrderServices = {
  createOrder,
};
