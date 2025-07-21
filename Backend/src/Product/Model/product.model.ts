/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prettier/prettier */

import { BaseModel } from 'src/Base/Model/base.model';

export class Product extends BaseModel {
    private name: string;
    private description: string;
    private price: number;
    private image: string;
    private type: string;



    constructor(
        name?: string,
        description?: string,
        price?: number,
        image?: string,
        type?: string
    ) {
        super();
        this.name = name ?? '';
        this.description = description ?? '';
        this.price = price ?? 0;
        this.image = image ?? '';
        this.type = type ?? '';
    }


}
