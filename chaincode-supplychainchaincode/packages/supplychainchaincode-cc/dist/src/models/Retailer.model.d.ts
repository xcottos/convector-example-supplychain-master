import { ConvectorModel } from '@worldsibu/convector-core-model';
export declare class Retailer extends ConvectorModel<Retailer> {
    readonly type: string;
    name: string;
    productsOrdered: number;
    productsAvailable: number;
    productsSold: number;
}
