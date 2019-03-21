import { ChaincodeStub, ChaincodeResponse } from 'fabric-shim';
import { Chaincode as CC, StubHelper } from '@theledger/fabric-chaincode-utils';
export { ChaincodeResponse };
export declare class Chaincode extends CC {
    private initialized;
    Init(stub: ChaincodeStub): Promise<ChaincodeResponse>;
    Invoke(stub: ChaincodeStub): Promise<ChaincodeResponse>;
    initControllers(stub: StubHelper, args: string[]): Promise<void>;
    private getConfig(stub, refreshOrConfig, dontThrow?);
}
