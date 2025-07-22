/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */

import { Controller, Get, Post, Body, HttpCode, HttpStatus, Param, ParseIntPipe, HttpException } from '@nestjs/common';
import { ProductService } from '../Services/product.service';
import { CreateProductDto } from './Dto/Request/create-product.dto';
import { Product } from '../Model/product.model';

@Controller('product')
export class ProductController {

    constructor(private readonly _productService: ProductService) { }

    @Get()
    async getAllProductsAsync(): Promise<Product[]> {
        return await this._productService.getAllProduct();
    }

    @Get(':id')
    async getProductByIdAsync(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return await this._productService.getByIdAsync(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createProductAsync(@Body() productoDto: CreateProductDto): Promise<{ message: string }> {
        try {
            await this._productService.createProduct(productoDto);
            return {
                message: 'Produto criado com sucesso',
            };
        } catch (error) {
            console.log("error", error)
            throw new HttpException(
                {
                    message: 'Erro ao criar produto',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Post('paged')
    async getPagedProducts(@Body() body: { page?: number; size?: number }) {
        const page = Number(body.page) || 1;
        const size = Number(body.size) || 5;

        return this._productService.getProductsPaged({ page, size });
    }

}
