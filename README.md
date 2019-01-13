# convector-example-supplychain-master

## Introduction

This project is an end to end example of a generic supply chain process blockchain based, using the Convector Framework (https://worldsibu.github.io/convector/)

As stated on the site:

*"Convector is a JavaScript-based Development Framework for Enterprise Smart Contract Systems. Its goal is to make it easier for developers to create, test and deploy enterprise-grade DApps by abstracting complexities that make it hard to get started, plus a collection of tools that speed up your go-to-market."*

The goal of this project is to explain the process for creating a working end to end and to  be a baseline for discussion about the best practices of usage of this promising framework.

## Use Case

The use case is a simple representation of a generic supply chain process where the lifecycle of a **Product** is tracked from the extraction of the raw material to make it, until its selling by the **Retailers** .

The entities that participate in this project are:

+ **Supplier**
	+ fetches the raw material that can be supplied to the **Manufacturers**
+ **Manufacturer**
	+ gets the raw material from the **Suppliers**
	+ creates the **Products**
	+ sends the **Products** to the **Distributors**
+ **Distributor**
	+ ships the **Products** to the **Retailers**
+ **Retailer**
	+ orders the **Products** from the **Distributors**
	+ sends the acknowledgement of the reception of the **Products** to the **Distributors**
+ **Customer**
	+ buys the **Products** from the **Retailers**

The high level sequence is described below:
![Supply Chain](https://github.com/xcottos/convector-example-supplychain-master/blob/master/images/supply-chain.bpmn.png "Supply Chain")

## Implementation

This example starts from the installation of the following pre-requisites (there are also the exact versions I'm actually using):

+ Node version 8.11.4
+ Docker 18.06.1
+ npm 6.4.1
+ nvm 0.33.0
+ npx 6.5.0
+ npm-run-all 4.1.3
+ lerna 3.4.1

The following paragraphs describe the procedure to generate this  project from the end to end.

### Project Init

First, the convector-cli package must be installed globally:

``
npm i -g @worldsibu/convector-cli
``

Then we can start creating the project skeleton using the `conv` command that is invoked with 3 parameters:
+ **new** - for generating a new project
+ **supplychain** - is the name of the project and of the root folder  that will be created
+ **-c supplychainchaincode**: default chaincode name

```conv new supplychain -c supplychainchaincode```

With the execution of this script a directory called **supplychain** has been created.

Login into that folder

``cd supplychain``

Into this folder there are some configuration files and the folder **packages**.

Now in the file called **package.json** you have to add a line that will be the definition of the command **cc:invoke** that will be used later to interact with the application

the line to add is the following:

```
"cc:invoke": "f() { chaincode-manager --config ./$2.$1.config.json --user $3 invoke $1 ${@:4}; }; f"
```
so at the end your file should look like

```javascript
{
  "name": "supplychain",
  "version": "0.1.0",
  "description": "Bootstrap project for Chaincodes supplychain",
  "files": [
    "dist/*"
  ],
  "scripts": {
    "install": "npm-run-all -s lerna:install",
    "env:restart": "./node_modules/@worldsibu/convector-tool-dev-env/scripts/restart.sh",
    "env:clean": "./node_modules/@worldsibu/convector-tool-dev-env/scripts/clean.sh",
    "cc:start": "f() { npm-run-all -s \"cc:package -- $1 org1\" \"cc:install -- $1 $2 org1\" \"cc:install -- $1 $2 org2\" \"cc:instantiate -- $1 $2 org1\"; }; f",
    "cc:upgrade": "f() { npm-run-all -s \"cc:package -- $1 org1\" \"cc:install -- $1 $2 org1\" \"cc:install -- $1 $2 org2\" \"cc:upgradePerOrg -- $1 $2\"; }; f",
    "===================INTERNALS===================": "===================NO NEED TO CALL THEM DIRECTLY===================",
    "lerna:install": "lerna bootstrap",
    "lerna:build": "lerna run build",
    "cc:package": "f() { npm run lerna:build; chaincode-manager --config ./$2.$1.config.json --output ./chaincode package; }; f",
    "cc:install": "f() { chaincode-manager --config ./$3.$1.config.json install ./chaincode $1 $2; }; f",
    "cc:instantiate": "f() { chaincode-manager --config ./$3.$1.config.json instantiate $1 $2; }; f",
    "cc:upgradePerOrg": "f() { chaincode-manager --config ./org1.$1.config.json upgrade $1 $2; }; f",
    "cc:invoke": "f() { chaincode-manager --config ./$2.$1.config.json --user $3 invoke $1 ${@:4}; }; f"
},
  "devDependencies": {
    "lerna": "^3.4.3",
    "@worldsibu/convector-adapter-mock": "^1.2.0",
    "@worldsibu/convector-tool-chaincode-manager": "^1.2.0",
    "@worldsibu/convector-tool-dev-env": "^1.2.0",
    "fabric-ca-client": "~1.1.2",
    "fabric-client": "~1.1.2",
    "npm-run-all": "^4.1.5"
  }
}
```

now install all the packages executing the ``npm i`` command

At the end of the installation you should receive a message like:

```
added 904 packages from 567 contributors and audited 42833 packages in 65.967s
found 30 vulnerabilities (10 low, 10 moderate, 10 high)
  run `npm audit fix` to fix them, or `npm audit` for details
```

**Do not run ``npm audit fix`` because it will probably break the installation.**

However this is something I will go in deep in the future.

Within all the packages an **Hyperledger Fabric 1.1.0** version is installed (the package is called **@worldsibu/convector-tool-dev-env**) but since the **fabric-client** and **fabric-ca-client** are peer dependencies the code can be ran on existing instances without problems. (I will update this project with that part in the future)

Then to check if the skeleton is working:

``npm run env:restart``

The first execution of this command will take some time since it will download the docker images that will be used.

At the end you should receive something like:

```
Register admin for org1
Register admin for org2
Register user1 for org1
Register user1 for org2
Register user2 for org1
Register user2 for org2
Register user3 for org1
Register user3 for org2
```
What happened during the execution of the dommand is that the **Hyperledger Fabric 1.1.0** infrastructure has been started

running the ``docker ps -a`` command:

```
CONTAINER ID        IMAGE                                     COMMAND                  CREATED             STATUS              PORTS                                                                    NAMES
6fb1bf3be0be        hyperledger/fabric-peer:x86_64-1.1.0      "peer node start --p…"   About an hour ago   Up About an hour    0.0.0.0:8051->7051/tcp, 0.0.0.0:8052->7052/tcp, 0.0.0.0:8053->7053/tcp   peer0.org2.example.com
1cec8007989d        hyperledger/fabric-peer:x86_64-1.1.0      "peer node start --p…"   About an hour ago   Up About an hour    0.0.0.0:7051-7053->7051-7053/tcp                                         peer0.org1.example.com
e548786152b2        hyperledger/fabric-orderer:x86_64-1.1.0   "orderer"                About an hour ago   Up About an hour    0.0.0.0:7050->7050/tcp                                                   orderer.example.com
b66dba4d74df        hyperledger/fabric-ca:x86_64-1.1.0        "fabric-ca-server st…"   About an hour ago   Up About an hour    0.0.0.0:8054->7054/tcp                                                   ca.org2.example.com
ddc429937047        hyperledger/fabric-couchdb:x86_64-0.4.6   "tini -- /docker-ent…"   About an hour ago   Up About an hour    4369/tcp, 9100/tcp, 0.0.0.0:6984->5984/tcp                               couchdb.peer0.org2.example.com
4383da4df1d1        hyperledger/fabric-ca:x86_64-1.1.0        "fabric-ca-server st…"   About an hour ago   Up About an hour    0.0.0.0:7054->7054/tcp                                                   ca.org1.example.com
21f15839a160        hyperledger/fabric-couchdb:x86_64-0.4.6   "tini -- /docker-ent…"   About an hour ago   Up About an hour    4369/tcp, 9100/tcp, 0.0.0.0:5984->5984/tcp                               couchdb.peer0.org1.example.com
```

We can see there is:

+ 1 Orderer (orderer.example.com)
+ 2 Certificate Authorities (ca.org1.example.com, ca.org2.example.com)
+ 2 Peers (peer0.org1.example.com, peer0.org2.example.com)
+ 2 CouchDB instances (couchdb.peer0.org1.example.com, couchdb.peer0.org2.example.com)

Now, the last lines printed as output of the command are the registration of some users in the organizations (**org1** and **org2**) via the certificate authorities that we'll use for interacting with the system; if there are no errors on screen it should be all ok.

### Model/Controller pattern

The Convector framework approach follows the Model/Controller pattern that is well explained on the site:

_"Convector is designed to help you write reusable pieces of code that describe the nature of what a developer can do in a blockchain. A blockchain, in the developer’s eyes, is no more than a **data layer** protected by a **logic layer** defining the rules of what the outside world can do in with the inner data. Thus, a really comfortable way of writing chaincode logic (smart contracts) is by having **Models** describing the shape of the data and **Controllers** describing the actions and rules that apply to the models."_

so we re going to define the **Models** and the **Controllers**

First ``cd packages/supplychainchaincode-cc/src`` where the chaincode **supplychainchaincode** code is located.

You will see that 2 files have been created:

+ supplychainchaincode.model.ts (a sample Model)
+ supplychainchaincode.controller.ts (a sample Controller)


#### Models
with the ``conv generate`` command we now generate the stubs of our Models.

```
conv generate model Supplier
conv generate model Maufacturer
conv generate model Distributor
conv generate model Retailer
conv generate model Customer
```
You will see that now in the directory a file for each Model has been created:

```
Customer.model.ts
Distributor.model.ts
Maufacturer.model.ts
Retailer.model.ts
Supplier.model.ts
```
These files are written using Typescript language ([https://www.typescriptlang.org](https://www.typescriptlang.org)) that is expressive and generic enough for being used as a base of code generation (in this case the javascript code)

Opening each of them (i.e. Supplier.model.ts), you will see that there are also the properties **created** and **modified**. I decided to comment them out and to deal with them in the future.

Same thing has to be done to all the Models.

Now we need to add the variables that are specific for every Model:

+ **Supplier**
	+ rawMaterialAvailable: is a number that expresses the quantity of raw material available to be supplied
+ **Manufacturer**
	+ rawMaterialAvailable: is a number that expresses the quantity of raw material available to be used for creating products
	+ productsAvailable: is a number that expresses the quantity of products ready to be distributed
+ **Distributor**
	+ productsToBeShipped: is a number that expresses the quantity of products ready to be shipped
	+ productsShipped: is a number that expresses the quantity of products shipped
	+ productsReceived: is a number that expresses the quantity of products shipped that have been received.
+ **Retailer**
	+ productsOrdered: is a number that expresses the quantity of products ordered
	+ productsAvailable: is a number that expresses the quantity of products available for being sold
	+ productsSold: is a number that expresses the quantity of products that have been sold
+ **Customer**
	+ productsBought: is a number that expresses the quantity of products bought

So the **Supplier.model.ts** shoud now look like:
```javascript
import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Supplier extends ConvectorModel<Supplier> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.Supplier';

  @Required()
  @Validate(yup.string())
  public name: string;

  // @ReadOnly()
  // @Required()
  // @Validate(yup.number())
  // public created: number;
  //
  // @Required()
  // @Validate(yup.number())
  // public modified: number;

  @Required()
  @Validate(yup.number())
  public rawMaterialAvailable: number;

}
```

The **Manufacturer.model.ts** shoud now look like:
```javascript
import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Manufacturer extends ConvectorModel<Manufacturer> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.Manufacturer';

  @Required()
  @Validate(yup.string())
  public name: string;

  // @ReadOnly()
  // @Required()
  // @Validate(yup.number())
  // public created: number;
  //
  // @Required()
  // @Validate(yup.number())
  // public modified: number;

  @Required()
  @Validate(yup.number())
  public productsAvailable: number;

  @Required()
  @Validate(yup.number())
  public rawMaterialAvailable: number;

}
```
The **Distributor.model.ts** shoud now look like:
```javascript
import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Distributor extends ConvectorModel<Distributor> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.Distributor';

  @Required()
  @Validate(yup.string())
  public name: string;

  // @ReadOnly()
  // @Required()
  // @Validate(yup.number())
  // public created: number;
  //
  // @Required()
  // @Validate(yup.number())
  // public modified: number;

  @Required()
  @Validate(yup.number())
  public productsToBeShipped: number;

  @Required()
  @Validate(yup.number())
  public productsShipped: number;

  @Required()
  @Validate(yup.number())
  public productsReceived: number;
}

```
The **Retailer.model.ts** shoud now look like:
```javascript
import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Retailer extends ConvectorModel<Retailer> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.Retailer';

  @Required()
  @Validate(yup.string())
  public name: string;

  // @ReadOnly()
  // @Required()
  // @Validate(yup.number())
  // public created: number;
  //
  // @Required()
  // @Validate(yup.number())
  // public modified: number;

  @Required()
  @Validate(yup.number())
  public productsOrdered: number;

  @Required()
  @Validate(yup.number())
  public productsAvailable: number;

  @Required()
  @Validate(yup.number())
  public productsSold: number;
}
```
The **Customer.model.ts** shoud now look like:
```javascript
import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Customer extends ConvectorModel<Customer> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.Customer';

  @Required()
  @Validate(yup.string())
  public name: string;

  // @ReadOnly()
  // @Required()
  // @Validate(yup.number())
  // public created: number;
  //
  // @Required()
  // @Validate(yup.number())
  // public modified: number;

  @Required()
  @Validate(yup.number())
  public productsBought: number;
}
```
You can notice that there are no validations but the type ones. I will take care of refining it in the future.

Now that the Models have been created it's time to implement the logic.

#### Controller
For the Controller I will modify directly on the file called **supplychainchaincode.controller.ts** to keep the standard naming of the Controller in this folder

The Controller will contain all the logic for implementing the actions described in the **Use Case** section; specifically will contain the implementation of all the following **functions** that implement the logic:

**fetchRawMaterial:**
![Fetch Raw Material](https://github.com/xcottos/convector-example-supplychain-master/blob/master/images/fetchRawMaterial.png "Fetch Raw Material")

**getRawMaterialFromSupplier:**
![Get Raw Material](https://github.com/xcottos/convector-example-supplychain-master/blob/master/images/getRawMaterial.png "Get Raw Material")

**createProducts:**
![Create Products](https://github.com/xcottos/convector-example-supplychain-master/blob/master/images/createProducts.png "Create Products")

**sendProductsToDistribution:**
![Send Products to Distribution](https://github.com/xcottos/convector-example-supplychain-master/blob/master/images/sendsProductsToDistribution.png "Send Products to Distribution")

**orderProductsFromDistributor:**
![Order Products](https://github.com/xcottos/convector-example-supplychain-master/blob/master/images/orderShipProducts.png "Order Products")

**receiveProductsFromDistributor:**
![Receive Products](https://github.com/xcottos/convector-example-supplychain-master/blob/master/images/receiveProducts.png "Receive Products")

**buyProductsFromRetailer:**
![Buy Products](https://github.com/xcottos/convector-example-supplychain-master/blob/master/images/buyProducts.png "Buy Products")

Together with these functions I created also others that are used as helpers:

+ **createSupplier**: creates a Supplier
+ **createManufacturer**: creates a Manufacturer
+ **createDistributor**: creates a Distributor
+ **createRetailer**: creates a Retailer
+ **createCustomer**: creates a Customer
+ **getAllSuppliers**: shows all the created Suppliers
+ **getAllManufacturers**: shows all the created Manufacturers
+ **getAllDistributors**: shows all the created Distributors
+ **getAllRetailers**: shows all the created Retailers
+ **getAllCustomers**: shows all the created Customers
+ **getAllModels**: shows all the created Models

The implementation of the Controller is quite straight forward once there are few concepts clear:

Since in the Controller we manage Models the first step is understanding more in deep what a Model is as class: every Model extends a class called ConvectorModel&lt;T&gt; and you can read its definition in the file **node_modules/@worldsibu/convector-core-model/dist/src/convector-model.d.ts**

```javascript
import * as yup from 'yup';
export declare type FlatConvectorModel<T> = {
    [L in Exclude<keyof T, keyof ConvectorModel<any>>]: T[L];
};
export interface History<T> {
    value: T;
    txId: string;
    timestamp: number;
}
export declare abstract class ConvectorModel<T extends ConvectorModel<any>> {
    static schema<T extends ConvectorModel<any>>(this: new (...args: any[]) => T): yup.ObjectSchema<FlatConvectorModel<T> & {
        id: string;
    }>;
    static getOne<T extends ConvectorModel<any>>(this: new (content: any) => T, id: string, type?: new (content: any) => T): Promise<T>;
    static query<T>(type: new (content: any) => T, ...args: any[]): Promise<T | T[]>;
    static getAll<T extends ConvectorModel<any>>(this: new (content: any) => T, type?: string): Promise<T[]>;
    id: string;
    readonly abstract type: string;
    constructor();
    constructor(id: string);
    constructor(content: {
        [key in keyof T]?: T[key];
    });
    update(content: {
        [key in keyof T]?: T[key];
    }): Promise<void>;
    fetch(): Promise<void>;
    history(): Promise<History<T>[]>;
    save(): Promise<void>;
    clone(): T;
    toJSON(skipEmpty?: boolean): {
        [key in keyof T]?: T[key];
    };
    delete(): Promise<void>;
    private assign(content, defaults?);
}
```
Here you can see that every Model, extending this class, inherited various methods:
+ some static ones: like **getOne**, **getAll** etc
+ some instance ones: like **save**, **update** and **delete**

And the field **id** that **must be set** when an instance of a Model is created.

If we now we analyze one of the methods in the Controller for creating a Model we can see already the usage of some of them:

**createSupplier**
```javascript
@Invokable()
  public async createSupplier(
    @Param(Supplier)
    supplier: Supplier
  ) {
    await supplier.save();

    const storedSuppliers = await Supplier.getAll('io.worldsibu.Supplier');
    console.log(storedSuppliers);
  }
```
The method is really straight forward because:
+ takes as input a Supplier object
+ uses the **save()** instance method for saving in the ledger the instance of the Supplier
+ uses the static **getAll()** method for retrieving all the Supplier instances stored in the ledger

All these methods follow the **async/await** pattern to be syncronous.

Another example to be explained is a function that impacts on Models that have been already stored in the ledger, like the **getRawMaterialFromSupplier** that is used to transfer raw material from the Supplier to the Manufacturer:

```javascript
@Invokable()
  public async getRawMaterialFromSupplier(
    @Param(yup.string())
    manufacturerId: string,
    @Param(yup.string())
    supplierId: string,
    @Param(yup.number())
    rawMaterialSupply: number
  ) {
    const supplier = await Supplier.getOne(supplierId);
    supplier.rawMaterialAvailable = supplier.rawMaterialAvailable - rawMaterialSupply;
    const manufacturer = await Manufacturer.getOne(manufacturerId);
    manufacturer.rawMaterialAvailable = rawMaterialSupply + manufacturer.rawMaterialAvailable;

    await supplier.save();
    await manufacturer.save();
  }
```
This function:
+ takes as input the ids of the Manufacturer and the Supplier and a number that represents the quantity of raw material to be tranfered
+ uses the static method **getOne** to retrieve the instances of Supplier and Manufacturer that have the id passed as parameters
+ changes the value of the variables in the instances of this 2 Models
+ save the models with the **save** function

All the functions are using these methods.

The file **supplychainchaincode.controller.ts** should look like this:
```javascript
import * as yup from 'yup';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core-controller';

import { Supplychainchaincode } from './supplychainchaincode.model';
import { Supplier } from './Supplier.model';
import { Manufacturer } from './Manufacturer.model';
import { Distributor } from './Distributor.model';
import { Retailer } from './Retailer.model';
import { Customer } from './Customer.model';

@Controller('supplychainchaincode')
export class SupplychainchaincodeController extends ConvectorController {

  @Invokable()
  public async create(
    @Param(Supplychainchaincode)
    supplychainchaincode: Supplychainchaincode
  ) {
    await supplychainchaincode.save();
  }

  @Invokable()
  public async createSupplier(
    @Param(Supplier)
    supplier: Supplier
  ) {
    await supplier.save();

    const storedSuppliers = await Supplier.getAll('io.worldsibu.Supplier');
    console.log(storedSuppliers);
  }

  @Invokable()
  public async createManufacturer(
    @Param(Manufacturer)
    manufacturer: Manufacturer
  ) {
    await manufacturer.save();

    const storedManufacturers = await Manufacturer.getAll('io.worldsibu.Manufacturer');
    console.log(storedManufacturers);
  }

  @Invokable()
  public async createDistributor(
    @Param(Distributor)
    distributor: Distributor
  ) {
    await distributor.save();

    const storedDistributors = await Distributor.getAll('io.worldsibu.Distributor');
    console.log(storedDistributors);
  }

  @Invokable()
  public async createRetailer(
    @Param(Retailer)
    retailer: Retailer
  ) {
    await retailer.save();

    const storedRetailers = await Retailer.getAll('io.worldsibu.Retailer');
    console.log(storedRetailers);
  }

  @Invokable()
  public async createCustomer(
    @Param(Customer)
    customer: Customer
  ) {
    await customer.save();

    const storedCustomers = await Customer.getAll('io.worldsibu.Customer');
    console.log(storedCustomers);
  }

  @Invokable()
  public async getAllSuppliers()
  {
    const storedSuppliers = await Supplier.getAll('io.worldsibu.Supplier');
    console.log(storedSuppliers);
  }

  @Invokable()
  public async getAllManufacturers()
  {
    const storedManufacturers = await Manufacturer.getAll('io.worldsibu.Manufacturer');
    console.log(storedManufacturers);
  }

  @Invokable()
  public async getAllDistributors()
  {
    const storedDistributors = await Distributor.getAll('io.worldsibu.Distributor');
    console.log(storedDistributors);
  }

  @Invokable()
  public async getAllRetailers()
  {
    const storedRetailers = await Retailer.getAll('io.worldsibu.Retailer');
    console.log(storedRetailers);
  }

  @Invokable()
  public async getAllCustomers()
  {
    const storedCustomers = await Customer.getAll('io.worldsibu.Customer');
    console.log(storedCustomers);
  }

  @Invokable()
  public async getAllModels()
  {
    const storedCustomers = await Customer.getAll('io.worldsibu.Customer');
    console.log(storedCustomers);

    const storedRetailers = await Retailer.getAll('io.worldsibu.Retailer');
    console.log(storedRetailers);

    const storedDistributors = await Distributor.getAll('io.worldsibu.Distributor');
    console.log(storedDistributors);

    const storedManufacturers = await Manufacturer.getAll('io.worldsibu.Manufacturer');
    console.log(storedManufacturers);

    const storedSuppliers = await Supplier.getAll('io.worldsibu.Supplier');
    console.log(storedSuppliers);
  }

  @Invokable()
  public async fetchRawMaterial(
    @Param(yup.string())
    supplierId: string,
    @Param(yup.number())
    rawMaterialSupply: number
  ) {
    const supplier = await Supplier.getOne(supplierId);
    supplier.rawMaterialAvailable = supplier.rawMaterialAvailable + rawMaterialSupply;
    await supplier.save();
  }

  @Invokable()
  public async getRawMaterialFromSupplier(
    @Param(yup.string())
    manufacturerId: string,
    @Param(yup.string())
    supplierId: string,
    @Param(yup.number())
    rawMaterialSupply: number
  ) {
    const supplier = await Supplier.getOne(supplierId);
    supplier.rawMaterialAvailable = supplier.rawMaterialAvailable - rawMaterialSupply;
    const manufacturer = await Manufacturer.getOne(manufacturerId);
    manufacturer.rawMaterialAvailable = rawMaterialSupply + manufacturer.rawMaterialAvailable;

    await supplier.save();
    await manufacturer.save();
  }

  @Invokable()
  public async createProducts(
    @Param(yup.string())
    manufacturerId: string,
    @Param(yup.number())
    rawMaterialConsumed: number,
    @Param(yup.number())
    productsCreated: number
  ) {
    const manufacturer = await Manufacturer.getOne(manufacturerId);
    manufacturer.rawMaterialAvailable = manufacturer.rawMaterialAvailable - rawMaterialConsumed;
    manufacturer.productsAvailable = manufacturer.productsAvailable + productsCreated;
    await manufacturer.save();
  }

  @Invokable()
  public async sendProductsToDistribution(
    @Param(yup.string())
    manufacturerId: string,
    @Param(yup.string())
    distributorId: string,
    @Param(yup.number())
    sentProducts: number
  ) {
    const distributor = await Distributor.getOne(distributorId);
    distributor.productsToBeShipped = distributor.productsToBeShipped + sentProducts;
    const manufacturer = await Manufacturer.getOne(manufacturerId);
    manufacturer.productsAvailable = manufacturer.productsAvailable - sentProducts;

    await distributor.save();
    await manufacturer.save();
  }

  @Invokable()
  public async orderProductsFromDistributor(
    @Param(yup.string())
    retailerId: string,
    @Param(yup.string())
    distributorId: string,
    @Param(yup.number())
    orderedProducts: number
  ) {
    const retailer = await Retailer.getOne(retailerId);
    retailer.productsOrdered = retailer.productsOrdered + orderedProducts;
    const distributor = await Distributor.getOne(distributorId);
    distributor.productsToBeShipped = distributor.productsToBeShipped - orderedProducts;
    distributor.productsShipped = distributor.productsShipped + orderedProducts;

    await retailer.save();
    await distributor.save();
  }

  @Invokable()
  public async receiveProductsFromDistributor(
    @Param(yup.string())
    retailerId: string,
    @Param(yup.string())
    distributorId: string,
    @Param(yup.number())
    receivedProducts: number
  ) {
    const retailer = await Retailer.getOne(retailerId);
    retailer.productsAvailable = retailer.productsAvailable + receivedProducts;
    const distributor = await Distributor.getOne(distributorId);
    distributor.productsReceived = distributor.productsReceived + receivedProducts;

    await retailer.save();
    await distributor.save();
  }

  @Invokable()
  public async buyProductsFromRetailer(
    @Param(yup.string())
    retailerId: string,
    @Param(yup.string())
    customerId: string,
    @Param(yup.number())
    boughtProducts: number
  ) {
    const retailer = await Retailer.getOne(retailerId);
    retailer.productsAvailable = retailer.productsAvailable - boughtProducts;
    retailer.productsSold = retailer.productsSold + boughtProducts;
    const customer = await Customer.getOne(customerId);
    customer.productsBought = customer.productsBought + boughtProducts;

    await retailer.save();
    await customer.save();
  }
}
```

## Installation and execution of the code
Once the Models and Controller have been written, you have to go back to the root folder (**supplychain**) and run  the command ``npm i``

If there are no errors you should see the output that tells you the chaincode called **supplychainchaincode-cc@0.1.0** has been processed (generating the client, the controller interface etc.)

Now it's time to install and start the chaincode with the command ``npm run cc:start`` that is defined in the package.json as:
```
"cc:start": "f() { npm-run-all -s \"cc:package -- $1 org1\" \"cc:install -- $1 $2 org1\" \"cc:install -- $1 $2 org2\" \"cc:instantiate -- $1 $2 org1\"; }; f",
```
So it executes with the command ``npm-run-all`` a sequence of commands that are defined in the package.json (``cc:package``, ``cc:install``, ``cc:instantiate``) passing to them the 2 parameters that are provided:

+ chaincode name
+ chaincode version

```
npm run cc:start -- supplychainchaincode  1
```

The execution of this command should end with an output like the following:

```
> supplychain@0.1.0 cc:start /Users/luca/Projects/GitHubProjects/supplychain
> f() { npm-run-all -s "cc:package -- $1 org1" "cc:install -- $1 $2 org1" "cc:install -- $1 $2 org2" "cc:instantiate -- $1 $2 org1"; }; f "supplychainchaincode" "1"
............
<some other messages>
............
Installing now...
info: [packager/Node.js]: packaging Node Chaincode from /Users/luca/Projects/GitHubProjects/supplychain/chaincode
Installed successfully

> supplychain@0.1.0 cc:instantiate /Users/luca/Projects/GitHubProjects/supplychain
> f() { chaincode-manager --config ./$3.$1.config.json instantiate $1 $2; }; f "supplychainchaincode" "1" "org1"

Instantiating now...
error: [Transform] Error parsing buffer to JSON
supplychainchaincode1escc vscc*(



Org1MSP

Org2MSP2D
 �I�;>�v�XX�B�t\Lj�>�d�x �7�%�{)�v$iN�_2��!�U���l�
v���: ��_�.��l���M�w
                    �9�aq��i~rg��<B,



Org1MSP

Org2MSP
Instantiated successfully
Initializing controllers now...
Initialization successfully
```
Don't worry about the error message, it's more a warning that should disappear in the next versions of the framework.

Running now the command ``docker ps -a`` you should notice that there are 2 new containers:
```
bdf95fa3e0dc        dev-peer0.org2.example.com-supplychainchaincode-1-9aa5c4942285be49bae206964203b799cb1007bf5c72147bbe5f41f26272e663   "/bin/sh -c 'cd /usr…"   34 minutes ago      Up 34 minutes                                                                                dev-peer0.org2.example.com-supplychainchaincode-1
3894275b6094        dev-peer0.org1.example.com-supplychainchaincode-1-db109f7b3ff195ea8176d3ff1056d2abe63088114e7915bf9ee9ae438aef34c0   "/bin/sh -c 'cd /usr…"   34 minutes ago      Up 34 minutes                                                                                dev-peer0.org1.example.com-supplychainchaincode-1
```
That are the 2 containers, one per organization, called ``dev-peer0.org1.example.com-supplychainchaincode-1`` and ``dev-peer0.org2.example.com-supplychainchaincode-1``  that are running the chaincode.

## Interaction with the chaincode
For interacting with the chaincode we'll use the command ``npm run cc:invoke`` that is defined in the package.json as:
```
"cc:invoke": "f() { chaincode-manager --config ./$2.$1.config.json --user $3 invoke $1 ${@:4}; }; f"
```
It invokes the ``chaincode-manager`` command that is defined in ``node_modules/@worldsibu/convector-tool-chaincode-manager``

It takes as inputs 4 parameters:
+ chaincode name
+ organization name
+ user name
+ controller name

In our case chaincode name and controller name are the same so a sample invocation is:
```
npm run cc:invoke -- supplychainchaincode org1 user1 supplychainchaincode createSupplier '{"id":"SPL_1","name":"supplier1","rawMaterialAvailable":2000}'
```


This will invoke the method called **createSupplier** that we wrote in the **Controller** and will create a **Supplier** with id **SPL_1** that will be saved into the ledger.

In the folder **packages/supplychainchaincode-cc/script/** there's a file called **testScript_sh.sh** that contains a script that:
+ restarts the dev-env environment (the Hyperledger nodes)
+ rebuild and reinstall the chaincode and gives it as version number 1
+ creates a scenario with:
	+ 2 Suppliers (SPL_1 and SPL_2)
	+ 2 Manufacturers (MNF_1 and MNF_2)
	+ 2 Distributors (DST_1 and DST_2)
	+ 2 Retailers (RTL_1, RTL_2)
	+ 3 Customers (CST_1, CST_2 and CST_3)

where these entities interacts from the end to end: from the fetching of raw material until the selling of the products.
+ prints all the Models

This happens running the script **testScript_sh.sh** with the command
```
./testScript_sh.sh
```
To read the messages written on the console via the invocations of the ``console.log``  function within the Controller, you need to connect to one of the peers that executes the chaincode.

This is done with the command ``docker logs`` that accepts as parameter the id of the container that you saw as part of the output of the ``docker ps -a`` command.

In our scenario we use **bdf95fa3e0dc** that corresponds to **dev-peer0.org2.example.com-supplychainchaincode-1**

so the command will be:
```
docker logs bdf95fa3e0dc -f
```
Running this command you will see all the logs of the container in real time. It will show also all the past logs.

The last command output is the print of all the Models that shows the status of each of them after the execution of the end to end scenario:

```javascript
debug: [Chaincode] ============= START : supplychainchaincode_getAllModels ===========
info: [Chaincode] Args: supplychainchaincode_getAllModels
debug: [StubHelper] Query: {"selector":{"type":"io.worldsibu.Customer"}}
[ Customer {
    _id: 'CUS_1',
    _name: 'luca',
debug: [StubHelper] Query: {"selector":{"type":"io.worldsibu.Retailer"}}
    _productsBought: 2,
    _type: 'io.worldsibu.Customer' },
  Customer {
    _id: 'CUS_2',
    _name: 'diestrin',
    _productsBought: 4,
    _type: 'io.worldsibu.Customer' },
  Customer {
    _id: 'CUS_3',
    _name: 'waltermontes',
    _productsBought: 0,
    _type: 'io.worldsibu.Customer' } ]
[ Retailer {
    _id: 'RTL_1',
    _name: 'retailer1',
    _productsAvailable: 2,
    _productsOrdered: 6,
    _productsSold: 4,
    _type: 'io.worldsibu.Retailer' },
  Retailer {
    _id: 'RTL_2',
    _name: 'retailer2',
    _productsAvailable: 0,
    _productsOrdered: 2,
    _productsSold: 2,
    _type: 'io.worldsibu.Retailer' } ]
debug: [StubHelper] Query: {"selector":{"type":"io.worldsibu.Distributor"}}
[ Distributor {
    _id: 'DST_1',
    _name: 'distributor1',
    _productsReceived: 5,
    _productsShipped: 5,
    _productsToBeShipped: 6,
    _type: 'io.worldsibu.Distributor' },
  Distributor {
    _id: 'DST_2',
    _name: 'distributor2',
    _productsReceived: 3,
    _productsShipped: 3,
    _productsToBeShipped: 0,
    _type: 'io.worldsibu.Distributor' } ]
debug: [StubHelper] Query: {"selector":{"type":"io.worldsibu.Manufacturer"}}
[ Manufacturer {
    _id: 'MNF_1',
    _name: 'manufacturer1',
    _productsAvailable: 2,
    _rawMaterialAvailable: 525,
    _type: 'io.worldsibu.Manufacturer' },
  Manufacturer {
    _id: 'MNF_2',
    _name: 'manufacturer2',
    _productsAvailable: 44,
    _rawMaterialAvailable: 290,
    _type: 'io.worldsibu.Manufacturer' } ]
debug: [StubHelper] Query: {"selector":{"type":"io.worldsibu.Supplier"}}
[ Supplier {
    _id: 'SPL_1',
    _name: 'supplier1',
    _rawMaterialAvailable: 2300,
    _type: 'io.worldsibu.Supplier' },
  Supplier {
    _id: 'SPL_2',
    _name: 'supplier2',
    _rawMaterialAvailable: 4850,
    _type: 'io.worldsibu.Supplier' } ]
debug: [Chaincode] ============= END : supplychainchaincode_getAllModels ===========
```
If you don't have a specific docker situation, the first image you display with the ``docker ps -a`` command is one that executes the chaincode, in that case a nice command that saves you the time to read the image id and copy/paste every time is:
```
docker logs $(docker ps -qa | head -n 1) -f
```

## Node JS backend

In the next section I will describe how to implement a Node JS that will allow us to interact with the chaincode we implemented above (the controller) via REST API.

First of all we need to install the yeoman (https://yeoman.io) generator that we'll use for creating the skeleton of our backend:

```
npm install -g generator-express-no-stress-typescript2
```
No cd into the packages directory and generate the skeleton of the app:

```
yo express-no-stress-typescript supplychain-app
```

it generates a folder called supplychain-app. Now we need to verify the skeleton has been correctly generated:

```
npx lerna run compile --scope supplychain-app
npx lerna run dev --scope supplychain-app --stream
```
If there are no error messages it should already be possible to open http://localhost:3000 in the browser.

Now we need to install some dependencies:

To send transactions to the hyperledger fabric blockchain:

```
npx lerna add @worldsibu/convector-adapter-fabric --scope supplychain-app
```

To query the CouchDB

```
npx lerna add @worldsibu/convector-storage-couchdb --scope supplychain-app
```

To install the Fabric dependencies:

```
npx lerna add fabric-client --scope supplychain-app
npx lerna add fabric-ca-client --scope supplychain-app
```

To use the bytebuffer types:

```
npx lerna add @types/bytebuffer --scope supplychain-app
```

Now in the file packages/supplychain-app/tsconfig.json we need to add the ``"experimentalDecorators": true`` flag.

The tsconfig.json file will be then:

```javascript
{
  "compileOnSave": false,
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "esModuleInterop": true,
    "sourceMap": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "outDir": "dist",
    "typeRoots": ["node_modules/@types"]
  },
  "include": ["typings.d.ts", "server/**/*.ts"],
  "exclude": ["node_modules"]
}
```

For not replicate the model or the functions on the backend:

```
npx lerna add supplychainchaincode-cc --scope supplychain-app
```

Now we need to edit the .env file that contains some environmental variables that have to match our configuration. It could be probably left as it is if no changes have been done to the project folder structure:

```bash
APP_ID=supplychain-app
PORT=3000
LOG_LEVEL=debug
REQUEST_LIMIT=100kb
SESSION_SECRET=mySecret

#Swagger
SWAGGER_API_SPEC=/spec

KEYSTORE=../../../.convector-dev-env/.hfc-org1
USERCERT=admin
ORGCERT=org1
NETWORKPROFILE=./config/org1.network-profile.yaml
CHANNEL=ch1
CHAINCODE=supplychainchaincode
COUCHDBVIEW=ch1_supplychainchaincode
COUCHDB_PORT=5984
COUCHDB_HOST=localhost
COUCHDB_PROTOCOL=http
```

The file **./config/org1.network-profile.yaml** has to be created: So we need to create a folder named **config** and indide that folder a file called **org1.network-profile.yaml** that contains all the needed info for configuring the fabric network (defining the number of channels, of peers, of CA etc etc).

```JavaScript
name: "Org1"
version: "1.0"

client:
  organization: Org1MSP
  credentialStore:
    path: ../../.convector-dev-env/.hfc-org1
    cryptoStore:
      path: ../../.convector-dev-env/.hfc-org1

channels:
  ch1:
    orderers:
      - orderer.example.com
    peers:
      peer0.org1.example.com:
        endorsingPeer: true
        chaincodeQuery: true
        ledgerQuery: true
        eventSource: true

      peer0.org2.example.com:
        endorsingPeer: true
        chaincodeQuery: false
        ledgerQuery: false
        eventSource: false

  ch2:
    orderers:
      - orderer.example.com
    peers:
      peer0.org1.example.com:
        endorsingPeer: true
        chaincodeQuery: true
        ledgerQuery: true
        eventSource: true

      peer0.org2.example.com:
        endorsingPeer: true
        chaincodeQuery: false
        ledgerQuery: false
        eventSource: false

organizations:
  Org1MSP:
    mspid: Org1MSP
    peers:
      - peer0.org1.example.com
    certificateAuthorities:
      - ca.org1.example.com
    adminPrivateKey:
      path: ../../.convector-dev-env/network-objects/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/69c76b7cf25d590da9e1cc74f5c9de2414108226a79e2a81d31a8090435e613f_sk
    signedCert:
      path: ../../.convector-dev-env/network-objects/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/signcerts/Admin@org1.example.com-cert.pem

  Org2MSP:
    mspid: Org2MSP
    peers:
      - peer0.org2.example.com
    certificateAuthorities:
      - ca.org2.example.com

orderers:
  orderer.example.com:
    url: grpc://localhost:7050
    grpcOptions:
      ssl-target-name-override: orderer.example.com
    tlsCACerts:
      path: ../../.convector-dev-env/network-objects/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

peers:
  peer0.org1.example.com:
    url: grpc://localhost:7051
    eventUrl: grpc://localhost:7052
    grpcOptions:
      ssl-target-name-override: peer0.org1.example.com
      grpc.keepalive_time_ms: 600000
    tlsCACerts:
      path: ../../.convector-dev-env/network-objects/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/msp/tlscacerts/tlsca.org1.example.com-cert.pem

  peer0.org2.example.com:
    url: grpc://localhost:8051
    eventUrl: grpc://localhost:8052
    grpcOptions:
      ssl-target-name-override: peer0.org2.example.com
      grpc.keepalive_time_ms: 600000
    tlsCACerts:
      path: ../../.convector-dev-env/network-objects/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/msp/tlscacerts/tlsca.org2.example.com-cert.pem

certificateAuthorities:
  ca.org1.example.com:
    url: http://localhost:7054
    httpOptions:
      verify: false
    tlsCACerts:
      path: ../../.convector-dev-env//network-objects/crypto-config/peerOrganizations/org1.example.com/ca/ca.org1.example.com-cert.pem
    registrar:
      - enrollId: admin
        enrollSecret: adminpw
    caName: ca.org1.example.com

  ca.org2.example.com:
    url: http://localhost:8054
    httpOptions:
      verify: false
    tlsCACerts:
      path: ../../.convector-dev-env//network-objects/crypto-config/peerOrganizations/org2.example.com/ca/ca.org2.example.com-cert.pem
    registrar:
      - enrollId: admin
        enrollSecret: adminpw
    caName: ca.org2.example.com
```

Now we need to create a file called **packages/supplychain-app/server/selfgenfabriccontext.ts** that contains the environment variables and helper that will be used to interact with the fabric-client and the function **getClient()** that instantiates the **Client** object from the **fabric-client** library and configures it reading the files which names are specified using a variable present in the **.env** file we created above.

We read 3 variables:

```JavaScript
KEYSTORE=../../../.convector-dev-env/.hfc-org1
USERCERT=admin
ORGCERT=org1
```

```javascript
/** Referenced from: https://github.com/ksachdeva/hyperledger-fabric-example/blob/c41fcaa352e78cbf3c7cfb210338ac0f20b8357e/src/client.ts */
import * as fs from 'fs';
import { join } from 'path';
import Client from 'fabric-client';

import { IEnrollmentRequest, IRegisterRequest } from 'fabric-ca-client';

export type UserParams = IRegisterRequest;
export type AdminParams = IEnrollmentRequest;

export namespace SelfGenContext {

  interface IdentityFiles {
    privateKey: string;
    signedCert: string;
  }

  export async function getClient() {
    // Check if needed
    const contextPath = join(__dirname, process.env.KEYSTORE + '/' + process.env.USERCERT);

    fs.readFile(contextPath, 'utf8', async function (err, data) {
      if (err) {
        // doesnt exist! Create it.
        const client = new Client();

        console.log('Setting up the cryptoSuite ..');

        // ## Setup the cryptosuite (we are using the built in default s/w based implementation)
        const cryptoSuite = Client.newCryptoSuite();
        cryptoSuite.setCryptoKeyStore(Client.newCryptoKeyStore({
          path: process.env.KEYSTORE
        }));

        client.setCryptoSuite(cryptoSuite);

        console.log('Setting up the keyvalue store ..');

        // ## Setup the default keyvalue store where the state will be stored
        const store = await Client.newDefaultKeyValueStore({
          path: process.env.KEYSTORE
        });

        client.setStateStore(store);

        console.log('Creating the admin user context ..');

        const privateKeyFile = fs.readdirSync(process.env.KEYSTORE + '/keystore')[0];

        // ###  GET THE NECESSRY KEY MATERIAL FOR THE ADMIN OF THE SPECIFIED ORG  ##
        const cryptoContentOrgAdmin: IdentityFiles = {
          privateKey: process.env.KEYSTORE + '/keystore/' + privateKeyFile,
          signedCert: process.env.KEYSTORE + '/signcerts/cert.pem'
        };

        await client.createUser({
          username: process.env.USERCERT,
          mspid: `${process.env.ORGCERT}MSP`,
          cryptoContent: cryptoContentOrgAdmin,
          skipPersistence: false
        });

        return client;
      } else {
        console.log('Context exists');
      }
    });

  }

}
```

We need to create a file **packages/supplychain-app/server/smartContractControllers.ts** where we configure the fabric adapter and then, to call the blockchain, we reuse the SupplychainchaincodeControllerClient that was created automatically before:

```javascript
import { resolve } from "path";
import { SelfGenContext } from "./selfgenfabricontext";
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
```

What we did here is defining an object called **SupplyChainController** that has a function **init()** that reads the **USERCERT** variable from the .env file, and creates the client that we defined above. Then it creates a **FabricControllerAdapter** reading the **CHANNEL**, the **CHAINCODE** and other parameters read from .env. Once configured the adapter ini initiated with the **init()** invokation.

Now in order to use the imported objects from the client automatically generated during the previous section in the folder **packages/supplychainchaincode-cc/client** we need to edit the file **packages/supplychainchaincode-cc/src/index.ts** because of a bug of the convector-cli that doesn't update the exported modules:

```javascript
export * from './supplychainchaincode.model';
export * from './supplychainchaincode.controller';
export * from './Supplier.model';
export * from './Manufacturer.model';
export * from './Distributor.model';
export * from './Retailer.model';
export * from './Customer.model';
```

We need now to cd into the directory **packages/supplychainchaincode-cc** and regenerate the client files:

```
lerna run client:generate
```

We need now to create a file called **packages/supplychain-app/server/smartContractModels.ts** that will export the names of the Models using the ones defined in the client directory. This class will be used in the controller client that will be described shortly:

```javascript
import { BaseStorage } from '@worldsibu/convector-core-storage';
import { CouchDBStorage } from '@worldsibu/convector-storage-couchdb';
import { Supplier as SupplierModel } from 'supplychainchaincode-cc/client';
import { Manufacturer as ManufacturerModel } from 'supplychainchaincode-cc/client';
import { Distributor as DistributorModel } from 'supplychainchaincode-cc/client';
import { Retailer as RetailerModel } from 'supplychainchaincode-cc/client';
import { Customer as CustomerModel } from 'supplychainchaincode-cc/client';

export namespace Models {
    export const Supplier = SupplierModel;
    export const Manufacturer = ManufacturerModel;
    export const Distributor = DistributorModel;
    export const Retailer = RetailerModel;
    export const Customer = CustomerModel;
}
```

Now we have to edit the **./packages/supplychain-app/server/common/swagger/Api.yaml** in order to have the Swagger API recognising our models:

```javascript
swagger: "2.0"
info:
  version: 1.0.0
  title: supplychain-app
  description: SupplyChain app
basePath: /api/v1/supplychain
tags:
  - name: Suppliers
    description: Simple supplier endpoints
  - name: Manufacturers
    description: Simple manufacturer endpoints
  - name: Distributors
    description: Simple distributor endpoints
  - name: Retailers
    description: Simple retailer endpoints
  - name: Customers
    description: Simple customer endpoints
  - name: Specification
    description: The swagger API specification

consumes:
  - application/json
produces:
  - application/json


definitions:

  SupplierBody:
    type: object
    title: supplier
    required:
			- id
      - name
      - rawMaterialAvailable
    properties:
			id:
				type: string
				example: SPL_3
			name:
        type: string
        example: Supplier3
      rawMaterialAvailable:
        type: number
        example: 123

  ManufacturerBody:
    type: object
    title: manufacturer
    required:
			- id
      - name
      - productsAvailable
      - rawMaterialAvailable
    properties:
			id:
				type: string
				example: MNF_3
      name:
        type: string
        example: Manufacturer3
      productsAvailable:
        type: number
        example: 123
      rawMaterialAvailable:
        type: number
        example: 123

  DistributorBody:
    type: object
    title: distributor
    required:
			- id
      - name
      - productsToBeShipped
      - productsShipped
      - productsReceived
    properties:
			id:
				type: string
				example: DST_3
      name:
        type: string
        example: Distributor3
      productsToBeShipped:
        type: number
        example: 123
      productsShipped:
        type: number
        example: 123
      productsReceived:
        type: number
        example: 123

  RetailerBody:
    type: object
    title: retailer
    required:
			- id
      - name
      - productsBought
      - productsAvailable
      - productsSold
    properties:
			id:
				type: string
				example: RTL_3
      name:
        type: string
        example: Retailer3
      productsBought:
        type: number
        example: 123
      productsAvailable:
        type: number
        example: 123
      productsSold:
        type: number
        example: 123

  CustomerBody:
    type: object
    title: customer
    required:
			- id
      - name
      - productsBought
    properties:
			id:
				type: string
				example: CUS_4
      name:
        type: string
        example: Customer1
      productsBought:
        type: number
        example: 123

paths:
  /suppliers:
    get:
      tags:
        - Suppliers
      description: Fetch all suppliers
      responses:
        200:
          description: Returns all suppliers
    post:
      tags:
        - Suppliers
      description: Create a new supplier
      parameters:
        - name: supplier
          in: body
          description: a supplier
          required: true
          schema:
            $ref: "#/definitions/SupplierBody"
      responses:
        200:
          description: Returns all suppliers

  /suppliers/{id}:
    get:
      tags:
        - Suppliers
      parameters:
        - name: id
          in: path
          required: true
          description: The id of the supplier to retrieve
          type: string
      responses:
        200:
          description: Return the suppplier with the specified id
        404:
          description: Supplier not found

  /manufacturers:
    get:
      tags:
        - Manufacturers
      description: Fetch all manufacturers
      responses:
        200:
          description: Returns all manufacturers
    post:
      tags:
        - Manufacturers
      description: Create a new manufacturer
      parameters:
        - name: manufacturer
          in: body
          description: a manufacturer
          required: true
          schema:
            $ref: "#/definitions/ManufacturerBody"
      responses:
        200:
          description: Returns all manufacturers

  /manufacturers/{id}:
    get:
      tags:
        - Manufacturers
      parameters:
        - name: id
          in: path
          required: true
          description: The id of the manufacturer to retrieve
          type: integer
      responses:
        200:
          description: Return the suppplier with the specified id
        404:
          description: Manufacturer not found

  /distributors:
    get:
      tags:
        - Distributors
      description: Fetch all distributors
      responses:
        200:
          description: Returns all distributors
    post:
      tags:
        - Distributors
      description: Create a new distributor
      parameters:
        - name: distributor
          in: body
          description: a distributor
          required: true
          schema:
            $ref: "#/definitions/DistributorBody"
      responses:
        200:
          description: Returns all distributors

  /distributors/{id}:
    get:
      tags:
        - Distributors
      parameters:
        - name: id
          in: path
          required: true
          description: The id of the distributor to retrieve
          type: string
      responses:
        200:
          description: Return the suppplier with the specified id
        404:
          description: Distributor not found

  /retailers:
    get:
      tags:
        - Retailers
      description: Fetch all retailers
      responses:
        200:
          description: Returns all retailers
    post:
      tags:
        - Retailers
      description: Create a new retailer
      parameters:
        - name: retailer
          in: body
          description: a retailer
          required: true
          schema:
            $ref: "#/definitions/RetailerBody"
      responses:
        200:
          description: Returns all retailers

  /retailers/{id}:
    get:
      tags:
        - Retailers
      parameters:
        - name: id
          in: path
          required: true
          description: The id of the retailer to retrieve
          type: string
      responses:
        200:
          description: Return the suppplier with the specified id
        404:
          description: Retailer not found

  /customers:
    get:
      tags:
        - Customers
      description: Fetch all customers
      responses:
        200:
          description: Returns all customers
    post:
      tags:
        - Customers
      description: Create a new customer
      parameters:
        - name: customer
          in: body
          description: a customer
          required: true
          schema:
            $ref: "#/definitions/CustomerBody"
      responses:
        200:
          description: Returns all customers

  /customers/{id}:
    get:
      tags:
        - Customers
      parameters:
        - name: id
          in: path
          required: true
          description: The id of the customer to retrieve
          type: string
      responses:
        200:
          description: Return the suppplier with the specified id
        404:
          description: Customer not found


  /spec:
    get:
      tags:
        - Specification
      responses:
        200:
          description: Return the API specification
```

In **./packages/myapp/server/api/controllers/examples/controller.ts** we can find the generated controller client that we need now to modify in order to call the methods of our blockchain controller (the one that we defined in the previous chapter)

```JavaScript
import { Request, Response } from 'express';
import { SupplyChainController } from '../../../smartContractControllers';
import { Models } from '../../../smartContractModels';

export class Controller {
  async getAllSuppliers(req: Request, res: Response): Promise<void> {
    let cntrl = await SupplyChainController.init();
    let results = await cntrl.getAllSuppliers();

    res.json(results);
  }

  async getSupplierById(req: Request, res: Response) {
    let cntrl = await SupplyChainController.init();
    let result = await cntrl.getSupplierById(req.params.supplierId);

    if (!result) {
      return res.status(404);
    }
    return res.json(result);
  }

  async createSupplier(req: Request, res: Response) {
    try {
      let cntrl = await SupplyChainController.init();
      let supplierRaw = req.body;
      supplierRaw.type = 'io.worldsibu.Supplier';
      console.log('supplier', supplierRaw);
      let supplier = new Models.Supplier(supplierRaw);
      await cntrl.createSupplier(supplier);

      res.send(201);
    } catch (ex) {
      console.log(ex.message, ex.stack);
      res.status(500).send(ex);
    }
  }

  async getAllManufacturers(req: Request, res: Response): Promise<void> {
    let cntrl = await SupplyChainController.init();
    let results = await cntrl.getAllManufacturers();

    res.json(results);
  }

  async getManufacturerById(req: Request, res: Response) {
    let cntrl = await SupplyChainController.init();
    let result = await cntrl.getManufacturerById(req.params.manufacturerId);

    if (!result) {
      return res.status(404);
    }
    return res.json(result);
  }

  async createManufacturer(req: Request, res: Response) {
    try {
      let cntrl = await SupplyChainController.init();
      let manufacturerRaw = req.body;
      manufacturerRaw.type = 'io.worldsibu.Manufacturer';
      console.log('manufacturer', manufacturerRaw);
      let manufacturer = new Models.Manufacturer(manufacturerRaw);
      await cntrl.createManufacturer(manufacturer);

      res.send(201);
    } catch (ex) {
      console.log(ex.message, ex.stack);
      res.status(500).send(ex);
    }
  }

  async getAllDistributors(req: Request, res: Response): Promise<void> {
    let cntrl = await SupplyChainController.init();
    let results = await cntrl.getAllDistributors();

    res.json(results);
  }

  async getDistributorById(req: Request, res: Response) {
    let cntrl = await SupplyChainController.init();
    let result = await cntrl.getDistributorById(req.params.distributorId);

    if (!result) {
      return res.status(404);
    }
    return res.json(result);
  }

  async createDistributor(req: Request, res: Response) {
    try {
      let cntrl = await SupplyChainController.init();
      let distributorRaw = req.body;
      distributorRaw.type = 'io.worldsibu.Distributor';
      console.log('distributor', distributorRaw);
      let distributor = new Models.Distributor(distributorRaw);
      await cntrl.createDistributor(distributor);

      res.send(201);
    } catch (ex) {
      console.log(ex.message, ex.stack);
      res.status(500).send(ex);
    }
  }

  async getAllRetailers(req: Request, res: Response): Promise<void> {
    let cntrl = await SupplyChainController.init();
    let results = await cntrl.getAllRetailers();

    res.json(results);
  }

  async getRetailerById(req: Request, res: Response) {
    let cntrl = await SupplyChainController.init();
    let result = await cntrl.getRetailerById(req.params.retailerId);

    if (!result) {
      return res.status(404);
    }
    return res.json(result);
  }

  async createRetailer(req: Request, res: Response) {
    try {
      let cntrl = await SupplyChainController.init();
      let retailerRaw = req.body;
      retailerRaw.type = 'io.worldsibu.Retailer';
      console.log('retailer', retailerRaw);
      let retailer = new Models.Retailer(retailerRaw);
      await cntrl.createRetailer(retailer);

      res.send(201);
    } catch (ex) {
      console.log(ex.message, ex.stack);
      res.status(500).send(ex);
    }
  }

  async getAllCustomers(req: Request, res: Response): Promise<void> {
    let cntrl = await SupplyChainController.init();
    let results = await cntrl.getAllCustomers();

    res.json(results);
  }

  async getCustomerById(req: Request, res: Response) {
    let cntrl = await SupplyChainController.init();
    let result = await cntrl.getCustomerById(req.params.customerId);

    if (!result) {
      return res.status(404);
    }
    return res.json(result);
  }

  async createCustomer(req: Request, res: Response) {
    try {
      let cntrl = await SupplyChainController.init();
      let customerRaw = req.body;
      customerRaw.type = 'io.worldsibu.Customer';
      console.log('customer', customerRaw);
      let customer = new Models.Customer(customerRaw);
      await cntrl.createCustomer(customer);

      res.send(201);
    } catch (ex) {
      console.log(ex.message, ex.stack);
      res.status(500).send(ex);
    }
  }

}
export default new Controller();
```

Now in **packages/supplychain-app/server/routes.ts** we need to add the base route for our API that in our case is **/api/v1/supplychain** as we specified in the **packages/supplychain-app/server/common/swagger/Api.yaml** where we defined ``basePath: /api/v1/supplychain``, it is the base for our any future invocation:

```JavaScript
import { Application } from 'express';
import supplyChainRouter from './api/controllers/examples/router'
export default function routes(app: Application): void {
  app.use('/api/v1/supplychain', supplyChainRouter);
};
```

The next step is defining the routes of our API considering as base **/api/v1/supplychain**. This file is **packages/supplychain-app/server/api/controllers/examples/router.ts**


```JavaScript
import express from 'express';
import controller from './controller'
export default express.Router()
    .post('/suppliers/', controller.createSupplier)
    .get('/suppliers/', controller.getAllSuppliers)
    .get('/suppliers/:supplierId', controller.getSupplierById)
    .post('/manufacturers/', controller.createManufacturer)
    .get('/manufacturers/', controller.getAllManufacturers)
    .get('/manufacturers/:manufacturerId', controller.getManufacturerById)
    .post('/distributors/', controller.createDistributor)
    .get('/distributors/', controller.getAllDistributors)
    .get('/distributors/:distributorId', controller.getDistributorById)
    .post('/retailers/', controller.createRetailer)
    .get('/retailers/', controller.getAllRetailers)
    .get('/retailers/:retailerId', controller.getRetailerById)
    .post('/customers/', controller.createCustomer)
    .get('/customers/', controller.getAllCustomers)
    .get('/customers/:customerId', controller.getCustomerById)

    ;
```

How it works is straight forward since in this file we can see that we define the methods starting by the HTTP method accepted (i.e. get, post etc.) followed by the suffix of the call (i.e. /suppliers/) and the correspondent controller method to be invoked (i.e. createSupplier)

That means that if, for example, the server receives this call ``http://localhost:3000/api/v1/supplychain/suppliers/`` invoked with the **GET** method, what will happen in the backend is that the method **getAllSuppliers** of the controller will be invoked.

Now we need to recompile everything:

``npx lerna run compile --scope supplychain-app``

and finally run the server:

``npx lerna run dev --scope supplychain-app --stream``

You should receive an output more or less like:

```javascript
info cli using local version of lerna
lerna notice cli v3.10.5
lerna info filter [ 'supplychain-app' ]
lerna info Executing command in 1 package: "npm run dev"
supplychain-app: > supplychain-app@1.0.0 dev /Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/packages/supplychain-app
supplychain-app: > nodemon server/index.ts | pino-pretty
supplychain-app: [nodemon] 1.18.9
supplychain-app: [nodemon] to restart at any time, enter `rs`
supplychain-app: [nodemon] watching: /Users/luca/Projects/GitHubProjects/cloned/convector-example-supplychain-master/packages/supplychain-app/server/**/*
supplychain-app: [nodemon] starting `ts-node server/index.ts`
supplychain-app: [1547391891540] INFO  (supplychain-app/29985 on lucas-MBP.lan): up and running in development @: lucas-MBP.lan on port: 3000}
```

That means that the server is up and running listening on the port 3000.

you can reach it with the browser on http://localhost:3000 and you will find a simple webapp that with swagger gives you a simple web interface to invoke the API.

You can also test them with **curl**

1) creating a Distributor:

```
curl -X POST "http://localhost:3000/api/v1/supplychain/distributors" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"id\": \"DST3\", \"name\": \"Distributor3\", \"productsToBeShipped\": 123, \"productsShipped\": 123, \"productsReceived\": 123}"
```

2) getting all Manufacturers:

```
curl -X GET "http://localhost:3000/api/v1/supplychain/manufacturers" -H "accept: application/json"
```

3) getting a specific Retailer:

```
curl -X GET "http://localhost:3000/api/v1/supplychain/retailers/RTL_2" -H "accept: application/json"
```

## Next steps

+ Trying to do the same with Loopback and then integrating Loopback API generation into convector-cli (to be discussed)
+ Deploying on an existant Hyperledger network
+ Authentication with possibly Passport
