import { Request, Response } from 'express';
import { ProductModel } from '../models/productModel';
import { validationResult } from 'express-validator';

export class ProductsController {
  constructor(private productModel: ProductModel) {}

  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await this.productModel.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getProductById(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const productId = parseInt(id);
    
    try {
      const product = await this.productModel.getProductById(productId);
      if (!product) return res.status(404).json({ error: 'Product not found' });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}