/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../Controller/Dto/Request/create-product.dto';
import { ProductRepository } from '../Repositories/product.repository';
import { Product } from '../Model/product.model';

@Injectable()
export class ProductService {
    constructor(private readonly _productRepository: ProductRepository) { }

    async createProduct(product: CreateProductDto) {
        const request = new Product(product.name, product.description, product.price, product.image, product.type);

        return this._productRepository.createAsync(request);
    }

    async getAllProduct(): Promise<Product[]> {
        const response: Product[] = await this._productRepository.getAll();

        return response;
    }

    async getByIdAsync(id: number): Promise<Product> {
        const uniqueProduct: Product | null = await this._productRepository.getById(id);

        if (!uniqueProduct) return new Product();

        return uniqueProduct;
    }

    async getProductsPaged(query: { page?: number; size?: number }) {
        const page = Number(query.page) || 1;
        const pageSize = Number(query.size) || 10;

        return this._productRepository.getPaged(page, pageSize, {
            orderBy: { createdAt: 'desc' },
        });
    }
}
