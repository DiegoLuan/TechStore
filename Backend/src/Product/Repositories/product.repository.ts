/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { Product } from '../Model/product.model';
import { PrismaService } from 'src/Core/Prisma/Service/prisma.service';
import { BaseRepository } from 'src/Base/Repository/base.repository';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
    constructor(prisma: PrismaService) {
        super(prisma, 'product');
    }
}

