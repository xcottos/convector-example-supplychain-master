# convector-example-supplychain-master

## Introduction

This example is an end to end example of a generic supply chain process blockchain based, using the Convector Framework (https://worldsibu.github.io/convector/)

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

    console.log("prima await")
    await supplier.save();
    console.log("dopo await")

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

    console.log("prima await")
    await supplier.save();
    console.log("dopo await")

    const storedSuppliers = await Supplier.getAll('io.worldsibu.Supplier');
    console.log(storedSuppliers);
  }

  @Invokable()
  public async createManufacturer(
    @Param(Manufacturer)
    manufacturer: Manufacturer
  ) {

    console.log("prima await")
    await manufacturer.save();
    console.log("dopo await")

    const storedManufacturers = await Manufacturer.getAll('io.worldsibu.Manufacturer');
    console.log(storedManufacturers);
  }

  @Invokable()
  public async createDistributor(
    @Param(Distributor)
    distributor: Distributor
  ) {

    console.log("prima await")
    await distributor.save();
    console.log("dopo await")

    const storedDistributors = await Distributor.getAll('io.worldsibu.Distributor');
    console.log(storedDistributors);
  }

  @Invokable()
  public async createRetailer(
    @Param(Retailer)
    retailer: Retailer
  ) {

    console.log("prima await")
    await retailer.save();
    console.log("dopo await")

    const storedRetailers = await Retailer.getAll('io.worldsibu.Retailer');
    console.log(storedRetailers);
  }

  @Invokable()
  public async createCustomer(
    @Param(Customer)
    customer: Customer
  ) {

    console.log("prima await")
    await customer.save();
    console.log("dopo await")

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
supplychainchaincode1escc"vscc*(



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

In our case chaincode anme and controller name are the same so a sample invocation is:
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
## Next steps
+ Writing a Node client
+ Writing an API layer (probably first with Express and then exploring more complex situations like trying to use the Models typescript to be used in Loopback for generating the API. Have to see how complex it is..)
+ Deploying on an existant Hyperledger network (thinking about upgrading the dev-env too at this point.. to be discussed)
+ Authentication
