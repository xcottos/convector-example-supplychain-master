import { ConvectorModel } from '@worldsibu/convector-core-model';
export declare class Manufacturer extends ConvectorModel<Manufacturer> {
    readonly type: string;
    name: string;
    productsAvailable: number;
    rawMaterialAvailable: number;
}
