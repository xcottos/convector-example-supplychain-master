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
