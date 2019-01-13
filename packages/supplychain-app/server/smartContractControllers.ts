import { resolve } from "path";
import { SelfGenContext } from "./selfgenfabriccontext";
import { SupplychainchaincodeControllerClient } from "supplychainchaincode-cc/client";
import { FabricControllerAdapter } from '@worldsibu/convector-adapter-fabric';

export namespace SupplyChainController {
    export async function init(): Promise<SupplychainchaincodeControllerClient> {
        const user = process.env.USERCERT || 'user1';
        await SelfGenContext.getClient();
        // Inject a Adapter of type *Fabric Controller*
        // Setup accordingly to the
        const adapter = new FabricControllerAdapter({
            txTimeout: 300000,
            user: user,
            channel: process.env.CHANNEL,
            chaincode: process.env.CHAINCODE,
            keyStore: resolve(__dirname, process.env.KEYSTORE),
            networkProfile: resolve(__dirname, process.env.NETWORKPROFILE),
            userMspPath: resolve(__dirname, process.env.KEYSTORE),
        });
        await adapter.init();
        // Return your own implementation of the controller
        return new SupplychainchaincodeControllerClient(adapter);
    }
}
