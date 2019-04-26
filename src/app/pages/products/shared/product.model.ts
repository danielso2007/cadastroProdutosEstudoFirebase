import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Product extends BaseResourceModel {
    name: string;
    stock: number;
    price: number;
}