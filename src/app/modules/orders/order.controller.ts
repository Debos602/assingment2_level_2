import { Request, Response } from 'express';
import { ZodError } from 'zod';
// import orderValidationSchema from './order.zod.validation';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    // Validate request data using Zod schema
    // const parsedData = orderValidationSchema.parse(orderData);

    // Create order
    const result = await OrderServices.createOrder(orderData);

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
        message: 'Something went wrong!',
        error: err,
      });
    }
  }
};

export const OrderControllers = {
  createOrder,
};
