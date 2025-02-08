import express from 'express';
import { ProductsController } from '../controllers/productsController';
import { ProductModel } from '../models/productModel';
import { initializeDatabase } from '..';

const router = express.Router();

initializeDatabase().then(async pool => {
  const productModel = new ProductModel(pool);
  const productsController = new ProductsController(productModel);

  router.get('/', productsController.getAllProducts.bind(productsController));
  router.get('/:id', productsController.getProductById.bind(productsController));
  router.post('/', productsController.createProduct.bind(productsController));
  router.put('/:id', productsController.updateProduct.bind(productsController));
  router.delete('/:id', productsController.deleteProduct.bind(productsController));
});

export default router;