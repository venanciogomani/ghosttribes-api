import express, { Request, Response } from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

async function initializeDatabase() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ghosttribes'
  });
  return connection;
}

initializeDatabase().then(connection => {
  console.log('Database connected');
}).catch(err => {
  console.error('Database connection failed:', err);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, ghost!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
