import { validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import { Request } from "express";

export interface IProduct {
    id: number;
    sku: number;
    name: string;
    description: string | null;
    price: number;
    salePrice: number;
    collectionId: number | null;
    categoryId: number | null;
    fileUrl: string | null;
    authorId: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

export function mapToProduct(req: Request): IProduct {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return {} as IProduct;
    }

    const uuid: string = uuidv4();
    const sku: number = parseInt(Math.random() * (100000000) + uuid.replace(/-/g, '').toString(), 10);

    return {
        id: parseInt(req.body.id),
        sku: sku,
        name: req.body.name,
        description: req.body.description,
        price: parseFloat(req.body.price),
        salePrice: parseFloat(req.body.salePrice),
        collectionId: parseInt(req.body.collectionId),
        categoryId: parseInt(req.body.categoryId),
        fileUrl: req.body.fileUrl,
        authorId: parseInt(req.body.authorId),
        status: parseInt(req.body.status),
        createdAt: new Date(req.body.createdAt),
        updatedAt: new Date(req.body.updatedAt),
    }
}