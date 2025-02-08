import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { Pool } from 'mysql2/promise';

export class ProductModel {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async getAllProducts() {
    try {
      const [rows] = await this.pool.query('SELECT * FROM products');
      return rows;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getProductById(id: number) {
    try {
        const [rows] = await this.pool.query<RowDataPacket[]>('SELECT * FROM products WHERE id =?', [id]);
        if (!rows || rows.length === 0) {
            return rows;
        }

        return rows[0];
    } catch (error) {
      console.log(error);
        return [];
    }
  }
}