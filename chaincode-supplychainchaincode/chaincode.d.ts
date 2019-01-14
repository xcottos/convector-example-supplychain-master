/// <reference types="@theledger/fabric-shim-types" />
/// <reference types="node" />
import { Stub } from 'fabric-shim';
import { Chaincode as CC, StubHelper } from '@theledger/fabric-chaincode-utils';
export declare class Chaincode extends CC {
    private initialized;
    Init(stub: Stub): Promise<{
        status: number;
        message: string;
        payload: Buffer;
    }>;
    Invoke(stub: Stub): Promise<{
        status: number;
        message: string;
        payload: Buffer;
    }>;
    initControllers(stub: StubHelper, args: string[]): Promise<void>;
    private getConfig(stub, refreshOrConfig, dontThrow?);
}
