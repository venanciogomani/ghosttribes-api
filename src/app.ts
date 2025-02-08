import express, { Application } from 'express';
import corsMiddleware from './middleware/corsMiddleware';
import productsRoute from './routes/productsRoute';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(corsMiddleware());

// Routes
app.use('/products', productsRoute);

export default app;