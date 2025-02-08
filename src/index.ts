import express, { Request, Response } from 'express';
import corsMiddleware from './middleware/corsMiddleware';
import mysql from 'mysql2/promise';
import productsRoute from './routes/productsRoute';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(corsMiddleware());

export async function initializeDatabase() {
  const pool = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ghosttribes'
  });
  return pool;
}

initializeDatabase().then(connection => {
  console.log('Database connected');
}).catch(err => {
  console.error('Database connection failed:', err);
});


// Routes
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/api', (req: Request, res: Response) => {
  res.send('Hello, ghost api!');
});

app.use('/api/products', productsRoute);