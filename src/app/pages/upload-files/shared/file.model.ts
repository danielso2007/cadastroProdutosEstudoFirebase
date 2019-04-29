import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class FileProduct extends BaseResourceModel {
    fileName: string;
    path: string;
    url?: string;
    size: number;
}