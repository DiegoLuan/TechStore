/* eslint-disable prettier/prettier */
// src/core/database/database.module.ts

import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../Prisma/Service/prisma.service';

@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class DatabaseModule { }
