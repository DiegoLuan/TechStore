/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductService } from './Services/product.service';
import { ProductController } from './Controller/product.controller';
import { ProductRepository } from './Repositories/product.repository';

@Module({
  providers: [ProductService, ProductRepository],
  exports: [ProductRepository],
  controllers: [ProductController]
})
export class ProductModule { }
