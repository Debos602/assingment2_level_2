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

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello text');
});

console.log(process.cwd());

export default app;
