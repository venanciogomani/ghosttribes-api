import { Request, Response } from 'express';
import { ProductModel } from '../models/productModel';
import { validationResult } from 'express-validator';
import { mapToProduct } from '../types/Product.types';

export class ProductsController {
  constructor(private productModel: ProductModel) {}

  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await this.productModel.getAllProducts();

      if (!products) {
        res.status(404).json({ error: 'Products not found' })
      } else {
        res.status(200).json(products);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getProductById(req: Request, res: Response) {
    this.getValidationResult(req, res);

    const { id } = req.params;
    const productId = parseInt(id);
    
    try {
      const product = await this.productModel.getProductById(productId);

      if (!product) {
        res.status(404).json({ error: 'Product not found' })
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createProduct(req: Request, res: Response) {
    this.getValidationResult(req, res);

    try {
      const newProduct = mapToProduct(req);

      if (!Object.keys(newProduct).length) {
        res.status(400).json({ error: 'Invalid product data' });
      } else {
        const productId = await this.productModel.createProduct(newProduct);
  
        res.status(201).json({ id: productId, message: 'Product created successfully'});
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateProduct(req: Request, res: Response) {
    this.getValidationResult(req, res);
    
    try {
      const id = parseInt(req.params.id, 10);
      const updatedProduct = mapToProduct(req);
      const success = await this.productModel.updateProduct(id, updatedProduct);
      if (!success || success === 0) {
        res.status(404).json({ error: 'Product not found' })
      } else {
        res.status(204).json({ message: 'Product updated successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    this.getValidationResult(req, res);

    try {
      const id = parseInt(req.params.id, 10);
      const success = await this.productModel.deleteProduct(id);
      if (!success || success === 0) {
        res.status(404).json({ error: 'Product not found' })
      } else {
        res.status(204).json({ message: 'Product deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  getValidationResult(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
  }
}