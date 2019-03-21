import { Schema } from 'yup';
import { ClientIdentity } from 'fabric-shim';
import { StubHelper } from '@theledger/fabric-chaincode-utils';
export declare class ChaincodeTx {
    stub: StubHelper;
    identity: ClientIdentity;
    constructor(stub: StubHelper, identity: ClientIdentity);
    getTransientValue<T>(name: string, validator: Schema<T> | {
        new (...args): T;
    }): Promise<T>;
}
