import { ConvectorModel } from '@worldsibu/convector-core-model';
export declare class Customer extends ConvectorModel<Customer> {
    readonly type: string;
    name: string;
    productsBought: number;
}
