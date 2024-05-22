import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { productRoutes } from './app/modules/products/product.route';
import { OrderRouter } from './app/modules/orders/order.routes';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/orders', OrderRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Product and Order Management API!');
});

// Route not found error handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
