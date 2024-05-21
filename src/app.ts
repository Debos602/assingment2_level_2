import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { productRoutes } from './app/modules/products/product.route';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());
app.use('/api/products', productRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello text');
});

console.log(process.cwd());

export default app;
