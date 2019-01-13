import { BaseStorage } from '@worldsibu/convector-core-storage';
import { CouchDBStorage } from '@worldsibu/convector-storage-couchdb';
import { Supplier as SupplierModel } from 'supplychainchaincode-cc/client';
import { Manufacturer as ManufacturerModel } from 'supplychainchaincode-cc/client';
import { Distributor as DistributorModel } from 'supplychainchaincode-cc/client';
import { Retailer as RetailerModel } from 'supplychainchaincode-cc/client';
import { Customer as CustomerModel } from 'supplychainchaincode-cc/client';

// BaseStorage.current = new CouchDBStorage({
//     host: process.env.COUCHDB_HOST,
//     protocol: process.env.COUCHDB_PROTOCOL,
//     port: process.env.COUCHDB_PORT
// }, process.env.COUCHDBVIEW);


export namespace Models {
    export const Supplier = SupplierModel;
    export const Manufacturer = ManufacturerModel;
    export const Distributor = DistributorModel;
    export const Retailer = RetailerModel;
    export const Customer = CustomerModel;
}
