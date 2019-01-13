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
