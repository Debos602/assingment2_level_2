import { Request, Response } from 'express';
import { ZodError } from 'zod';
// import orderValidationSchema from './order.zod.validation';
import { ProductServices } from '../products/product.service';
import { Product } from '../product.model';
import orderValidationSchema from './order.zod.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    console.log(orderData);

    // Create order

    const parsedData = orderValidationSchema.parse(orderData);
    // console.log(parsedData.productId);

    const product = await Product.findById(parsedData.productId);
    // console.log(product);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    // Check if the ordered quantity is available
    if (product.inventory.quantity < parsedData.quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }
    // Create order
    const result = await ProductServices.createOrder(orderData);

    // Update inventory
    product.inventory.quantity -= parsedData.quantity;

    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save();

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      // Send detailed validation error response
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: err.errors.map((e) => ({
          code: e.code,
          path: e.path.join('.'),
          message: e.message,
        })),
      });
    } else {
      // Send general error response
      res.status(500).json({
        success: false,
        message: 'Order not found!',
        error: err,
      });
    }
  }
};

export const OrderControllers = {
  createOrder,
};
