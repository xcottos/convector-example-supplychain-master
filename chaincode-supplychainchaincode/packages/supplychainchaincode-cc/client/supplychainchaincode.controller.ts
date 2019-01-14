import * as yup from 'yup';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core-controller';

import { Supplychainchaincode } from '../src/supplychainchaincode.model';
import { Supplier } from '../src/Supplier.model';
import { Manufacturer } from '../src/Manufacturer.model';
import { Distributor } from '../src/Distributor.model';
import { Retailer } from '../src/Retailer.model';
import { Customer } from '../src/Customer.model';
import { ControllerAdapter } from '@worldsibu/convector-core-adapter';


export class SupplychainchaincodeControllerClient extends ConvectorController {
  public name = 'supplychainchaincode';

  constructor(public adapter: ControllerAdapter, public user?: string) {
    super()
  }

  
  public async create(
    
    supplychainchaincode: Supplychainchaincode
  ) {

          return await this.adapter.invoke(this.name, 'create', this.user, supplychainchaincode);
        
  }

  
  public async createSupplier(
    
    supplier: Supplier
  ) {

          return await this.adapter.invoke(this.name, 'createSupplier', this.user, supplier);
        
  }

  
  public async createManufacturer(
    
    manufacturer: Manufacturer
  ) {

          return await this.adapter.invoke(this.name, 'createManufacturer', this.user, manufacturer);
        
  }

  
  public async createDistributor(
    
    distributor: Distributor
  ) {

          return await this.adapter.invoke(this.name, 'createDistributor', this.user, distributor);
        
  }

  
  public async createRetailer(
    
    retailer: Retailer
  ) {

          return await this.adapter.invoke(this.name, 'createRetailer', this.user, retailer);
        
  }

  
  public async createCustomer(
    
    customer: Customer
  ) {

          return await this.adapter.invoke(this.name, 'createCustomer', this.user, customer);
        
  }

  
  public async getAllSuppliers()
  {

          return await this.adapter.invoke(this.name, 'getAllSuppliers', this.user, );
        
  }

  
  public async getSupplierById(
    
    supplierId: string
  )
  {

          return await this.adapter.invoke(this.name, 'getSupplierById', this.user, supplierId);
        
  }

  
  public async getAllManufacturers()
  {

          return await this.adapter.invoke(this.name, 'getAllManufacturers', this.user, );
        
  }

  
  public async getManufacturerById(
    
    manufacturerId: string
  )
  {

          return await this.adapter.invoke(this.name, 'getManufacturerById', this.user, manufacturerId);
        
  }

  
  public async getAllDistributors()
  {

          return await this.adapter.invoke(this.name, 'getAllDistributors', this.user, );
        
  }

  
  public async getDistributorById(
    
    distributorId: string
  )
  {

          return await this.adapter.invoke(this.name, 'getDistributorById', this.user, distributorId);
        
  }

  
  public async getAllRetailers()
  {

          return await this.adapter.invoke(this.name, 'getAllRetailers', this.user, );
        
  }

  
  public async getRetailerById(
    
    retailerId: string
  )
  {

          return await this.adapter.invoke(this.name, 'getRetailerById', this.user, retailerId);
        
  }

  
  public async getAllCustomers()
  {

          return await this.adapter.invoke(this.name, 'getAllCustomers', this.user, );
        
  }

  
  public async getCustomerById(
    
    customerId: string
  )
  {

          return await this.adapter.invoke(this.name, 'getCustomerById', this.user, customerId);
        
  }

  
  public async getAllModels()
  {

          return await this.adapter.invoke(this.name, 'getAllModels', this.user, );
        
  }

  
  public async fetchRawMaterial(
    
    supplierId: string,
    
    rawMaterialSupply: number
  ) {

          return await this.adapter.invoke(this.name, 'fetchRawMaterial', this.user, supplierId, rawMaterialSupply);
        
  }

  
  public async getRawMaterialFromSupplier(
    
    manufacturerId: string,
    
    supplierId: string,
    
    rawMaterialSupply: number
  ) {

          return await this.adapter.invoke(this.name, 'getRawMaterialFromSupplier', this.user, manufacturerId, supplierId, rawMaterialSupply);
        
  }

  
  public async createProducts(
    
    manufacturerId: string,
    
    rawMaterialConsumed: number,
    
    productsCreated: number
  ) {

          return await this.adapter.invoke(this.name, 'createProducts', this.user, manufacturerId, rawMaterialConsumed, productsCreated);
        
  }

  
  public async sendProductsToDistribution(
    
    manufacturerId: string,
    
    distributorId: string,
    
    sentProducts: number
  ) {

          return await this.adapter.invoke(this.name, 'sendProductsToDistribution', this.user, manufacturerId, distributorId, sentProducts);
        
  }

  
  public async orderProductsFromDistributor(
    
    retailerId: string,
    
    distributorId: string,
    
    orderedProducts: number
  ) {

          return await this.adapter.invoke(this.name, 'orderProductsFromDistributor', this.user, retailerId, distributorId, orderedProducts);
        
  }

  
  public async receiveProductsFromDistributor(
    
    retailerId: string,
    
    distributorId: string,
    
    receivedProducts: number
  ) {

          return await this.adapter.invoke(this.name, 'receiveProductsFromDistributor', this.user, retailerId, distributorId, receivedProducts);
        
  }

  
  public async buyProductsFromRetailer(
    
    retailerId: string,
    
    customerId: string,
    
    boughtProducts: number
  ) {

          return await this.adapter.invoke(this.name, 'buyProductsFromRetailer', this.user, retailerId, customerId, boughtProducts);
        
  }
}
