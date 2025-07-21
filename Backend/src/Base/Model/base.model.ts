/* eslint-disable prettier/prettier */
export class BaseModel {
    private id?: number;
    private createdAt: Date;
    private updatedAt?: Date;

    constructor() {
        this.createdAt = new Date();
    }
}