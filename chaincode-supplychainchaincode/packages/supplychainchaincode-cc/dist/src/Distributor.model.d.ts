import { ConvectorModel } from '@worldsibu/convector-core-model';
export declare class Distributor extends ConvectorModel<Distributor> {
    readonly type: string;
    name: string;
    productsToBeShipped: number;
    productsShipped: number;
    productsReceived: number;
}
