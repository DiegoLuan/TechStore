/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { PrismaService } from "src/Core/Prisma/Service/prisma.service";

export class BaseRepository<T> {
    protected readonly prismaModel: any;

    constructor(
        protected readonly prisma: PrismaService,
        protected readonly modelName: keyof PrismaService
    ) {
        this.prismaModel = prisma[modelName] as any;
    }

    async getAll(): Promise<T[]> {
        return await this.prismaModel.findMany();
    }

    async getById(id: number): Promise<T | null> {
        return await this.prismaModel.findUnique({ where: { id } });
    }

    async createAsync(data: T): Promise<T> {
        return await this.prismaModel.create({ data });
    }

    async getPaged(
        page = 1,
        pageSize = 10,
        args: { where?: any; orderBy?: any } = {},
    ): Promise<{
        data: T[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }> {
        const skip = (page - 1) * pageSize;

        const [data, total] = await this.prisma.$transaction([
            this.prismaModel.findMany({
                skip,
                take: pageSize,
                ...args,
            }),
            this.prismaModel.count({ where: args.where }),
        ]);

        return {
            data,
            total,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize),
        };
    }

    async update(id: number, data: T): Promise<T> {
        return await this.prismaModel.update({ where: { id }, data });
    }

    async delete(id: number): Promise<T> {
        return await this.prismaModel.delete({ where: { id } });
    }
}
