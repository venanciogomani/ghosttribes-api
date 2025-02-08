import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { Pool } from 'mysql2/promise';
import { IProduct } from '../types/Product.types';

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

  async createProduct(product: IProduct) {
    try {
      const [result] = await this.pool.query<ResultSetHeader>('INSERT INTO products SET ?', product);
      return result.insertId;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async updateProduct(id: number, product: IProduct) {
    try {
      const [result] = await this.pool.query<ResultSetHeader>('UPDATE products SET ? WHERE id = ?', [product, id]);

      const affectedRows = result.affectedRows;
      return affectedRows;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  async deleteProduct(id: number) {
    try {
      const [result] = await this.pool.query<ResultSetHeader>('DELETE FROM products WHERE id = ?', [id]);
      return result.affectedRows;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }
}