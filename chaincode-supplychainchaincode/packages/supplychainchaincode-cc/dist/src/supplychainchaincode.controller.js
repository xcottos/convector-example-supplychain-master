"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var yup = require("yup");
var convector_core_controller_1 = require("@worldsibu/convector-core-controller");
var supplychainchaincode_model_1 = require("./supplychainchaincode.model");
var Supplier_model_1 = require("./Supplier.model");
var Manufacturer_model_1 = require("./Manufacturer.model");
var Distributor_model_1 = require("./Distributor.model");
var Retailer_model_1 = require("./Retailer.model");
var Customer_model_1 = require("./Customer.model");
var SupplychainchaincodeController = (function (_super) {
    tslib_1.__extends(SupplychainchaincodeController, _super);
    function SupplychainchaincodeController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SupplychainchaincodeController.prototype.create = function (supplychainchaincode) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, supplychainchaincode.save()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    SupplychainchaincodeController.prototype.createSupplier = function (supplier) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var storedSuppliers;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("prima await");
                        return [4, supplier.save()];
                    case 1:
                        _a.sent();
                        console.log("dopo await");
                        return [4, Supplier_model_1.Supplier.getAll('io.worldsibu.Supplier')];
                    case 2:
                        storedSuppliers = _a.sent();
                        console.log(storedSuppliers);
                        return [2];
                }
            });
        });
    };
    SupplychainchaincodeController.prototype.createManufacturer = function (manufacturer) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var storedManufacturers;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("prima await");
                        return [4, manufacturer.save()];
                    case 1:
                        _a.sent();
                        console.log("dopo await");
                        return [4, Manufacturer_model_1.Manufacturer.getAll('io.worldsibu.Manufacturer')];
                    case 2:
                        storedManufacturers = _a.sent();
                        console.log(storedManufacturers);
                        return [2];
                }
            });
        });
    };
    SupplychainchaincodeController.prototype.createDistributor = function (distributor) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var storedDistributors;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("prima await");
                        return [4, distributor.save()];
                    case 1:
                        _a.sent();
                        console.log("dopo await");
                        return [4, Distributor_model_1.Distributor.getAll('io.worldsibu.Distributor')];
                    case 2:
                        storedDistributors = _a.sent();
                        console.log(storedDistributors);
                        return [2];
                }
            });
        });
    };
    SupplychainchaincodeController.prototype.createRetailer = function (retailer) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var storedRetailers;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("prima await");
                        return [4, retailer.save()];
                    case 1:
                        _a.sent();
                        console.log("dopo await");
                        return [4, Retailer_model_1.Retailer.getAll('io.worldsibu.Retailer')];
                    case 2:
                        storedRetailers = _a.sent();
                        console.log(storedRetailers);
                        return [2];
                }
            });
        });
    };
    SupplychainchaincodeController.prototype.createCustomer = function (customer) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var storedCustomers;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, customer.save()];
                    case 1:
                        _a.sent();
                        return [4, Customer_model_1.Customer.getAll('io.worldsibu.Customer')];
                    case 2:
                        storedCustomers = _a.sent();
                        console.log(storedCustomers);
                        return [2];
                }
            });
        });
    };
    SupplychainchaincodeController.prototype.getAllSuppliers = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var storedSuppliers;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Supplier_model_1.Supplier.getAll('io.worldsibu.Supplier')];
                    case 1:
                        storedSuppliers = _a.sent();
                        console.log(storedSuppliers);
                        return [2, storedSuppliers];
                }
            });
        });
    };
    SupplychainchaincodeController.prototype.getSupplierById = function (supplierId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var supplier;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Supplier_model_1.Supplier.getOne(supplierId)];
                    case 1:
                        supplier = _a.sent();
                        console.log(supplier);
                        return [2, supplier];
                }
            });
        });
    };
    SupplychainchaincodeController.prototype.getAllManufacturers = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var storedManufacturers;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Manufacturer_model_1.Manufacturer.getAll('io.worldsibu.Manufacturer')];
                    case 1:
                        storedManufacturers = _a.sent();
                        console.log(storedManufacturers);
                        return [2, storedManufacturers];
                }
            });
        });
    };
    SupplychainchaincodeController.prototype.getManufacturerById = function (manufacturerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var manufacturer;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Manufacturer_model_1.Manufacturer.getOne(manufacturerId)];
                    case 1:
                        manufacturer = _a.sent();
                        console.log(manufacturer);
                        return [2, manufacturer];
                }
            });
        });
    };
    SupplychainchaincodeController.prototype.getAllDistributors = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var storedDistributors;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Distributor_model_1.Distributor.getAll('io.worldsibu.Distributor')];
                    case 1:
                        storedDistributors = _a.sent();
                        console.log(storedDistributors);
                        return [2, storedDistributors];
                }
            });
        });
    };
    SupplychainchaincodeController.prototype.getDistributorById = function (distributorId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var distributor;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Distributor_model_1.Distributor.getOne(distributorId)];
                    case 1:
                        distributor = _a.sent();
                        console.log(distributor);
                        return [2, distributor];
                }
            });
        });
    };
    SupplychainchaincodeController.prototype.getAllRetailers = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var storedRetailers;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Retailer_model_1.Retailer.getAll('io.worldsibu.Retailer')];
                    case 1:
                        storedRetailers = _a.sent();
                        console.log(storedRetailers);
                        return [2, storedRetailers];
                }
            });
        });
    };
    SupplychainchaincodeController.prototype.getRetailerById = function (retailerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var retailer;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Retailer_model_1.Retailer.getOne(retailerId)];
                    case 1:
                        retailer = _a.sent();
                        console.log(retailer);
                        return [2, retailer];
                }
            });
        });
    };
    SupplychainchaincodeController.prototype.getAllCustomers = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var storedCustomers;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Customer_model_1.Customer.getAll('io.worldsibu.Customer')];
                    case 1:
                        storedCustomers = _a.sent();
                        console.log(storedCustomers);
                        return [2, storedCustomers];
                }
            });
        });
    };
    SupplychainchaincodeController.prototype.getCustomerById = function (customerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var customer;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Customer_model_1.Customer.getOne(customerId)];
                    case 1:
                        customer = _a.sent();
                        console.log(customer);
                        return [2, customer];
                }
            });
        });
    };
    SupplychainchaincodeController.prototype.getAllModels = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var storedCustomers, storedRetailers, storedDistributors, storedManufacturers, storedSuppliers;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Customer_model_1.Customer.getAll('io.worldsibu.Customer')];
                    case 1:
                        storedCustomers = _a.sent();
                        console.log(storedCustomers);
                        return [4, Retailer_model_1.Retailer.getAll('io.worldsibu.Retailer')];
                    case 2:
                        storedRetailers = _a.sent();
                        console.log(storedRetailers);
                        return [4, Distributor_model_1.Distributor.getAll('io.worldsibu.Distributor')];
                    case 3:
                        storedDistributors = _a.sent();
                        console.log(storedDistributors);
                        return [4, Manufacturer_model_1.Manufacturer.getAll('io.worldsibu.Manufacturer')];
                    case 4:
                        storedManufacturers = _a.sent();
                        console.log(storedManufacturers);
                        return [4, Supplier_model_1.Supplier.getAll('io.worldsibu.Supplier')];
                    case 5:
                        storedSuppliers = _a.sent();
                        console.log(storedSuppliers);
                        return [2];
                }
            });
        });
    };
    SupplychainchaincodeController.prototype.fetchRawMaterial = function (supplierId, rawMaterialSupply) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var supplier;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Supplier_model_1.Supplier.getOne(supplierId)];
                    case 1:
                        supplier = _a.sent();
                        supplier.rawMaterialAvailable = supplier.rawMaterialAvailable + rawMaterialSupply;
                        return [4, supplier.save()];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    SupplychainchaincodeController.prototype.getRawMaterialFromSupplier = function (manufacturerId, supplierId, rawMaterialSupply) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var supplier, manufacturer;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Supplier_model_1.Supplier.getOne(supplierId)];
                    case 1:
                        supplier = _a.sent();
                        supplier.rawMaterialAvailable = supplier.rawMaterialAvailable - rawMaterialSupply;
                        return [4, Manufacturer_model_1.Manufacturer.getOne(manufacturerId)];
                    case 2:
                        manufacturer = _a.sent();
                        manufacturer.rawMaterialAvailable = rawMaterialSupply + manufacturer.rawMaterialAvailable;
                        return [4, supplier.save()];
                    case 3:
                        _a.sent();
                        return [4, manufacturer.save()];
                    case 4:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    SupplychainchaincodeController.prototype.createProducts = function (manufacturerId, rawMaterialConsumed, productsCreated) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var manufacturer;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Manufacturer_model_1.Manufacturer.getOne(manufacturerId)];
                    case 1:
                        manufacturer = _a.sent();
                        manufacturer.rawMaterialAvailable = manufacturer.rawMaterialAvailable - rawMaterialConsumed;
                        manufacturer.productsAvailable = manufacturer.productsAvailable + productsCreated;
                        return [4, manufacturer.save()];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    SupplychainchaincodeController.prototype.sendProductsToDistribution = function (manufacturerId, distributorId, sentProducts) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var distributor, manufacturer;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Distributor_model_1.Distributor.getOne(distributorId)];
                    case 1:
                        distributor = _a.sent();
                        distributor.productsToBeShipped = distributor.productsToBeShipped + sentProducts;
                        return [4, Manufacturer_model_1.Manufacturer.getOne(manufacturerId)];
                    case 2:
                        manufacturer = _a.sent();
                        manufacturer.productsAvailable = manufacturer.productsAvailable - sentProducts;
                        return [4, distributor.save()];
                    case 3:
                        _a.sent();
                        return [4, manufacturer.save()];
                    case 4:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    SupplychainchaincodeController.prototype.orderProductsFromDistributor = function (retailerId, distributorId, orderedProducts) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var retailer, distributor;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Retailer_model_1.Retailer.getOne(retailerId)];
                    case 1:
                        retailer = _a.sent();
                        retailer.productsOrdered = retailer.productsOrdered + orderedProducts;
                        return [4, Distributor_model_1.Distributor.getOne(distributorId)];
                    case 2:
                        distributor = _a.sent();
                        distributor.productsToBeShipped = distributor.productsToBeShipped - orderedProducts;
                        distributor.productsShipped = distributor.productsShipped + orderedProducts;
                        return [4, retailer.save()];
                    case 3:
                        _a.sent();
                        return [4, distributor.save()];
                    case 4:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    SupplychainchaincodeController.prototype.receiveProductsFromDistributor = function (retailerId, distributorId, receivedProducts) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var retailer, distributor;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Retailer_model_1.Retailer.getOne(retailerId)];
                    case 1:
                        retailer = _a.sent();
                        retailer.productsAvailable = retailer.productsAvailable + receivedProducts;
                        return [4, Distributor_model_1.Distributor.getOne(distributorId)];
                    case 2:
                        distributor = _a.sent();
                        distributor.productsReceived = distributor.productsReceived + receivedProducts;
                        return [4, retailer.save()];
                    case 3:
                        _a.sent();
                        return [4, distributor.save()];
                    case 4:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    SupplychainchaincodeController.prototype.buyProductsFromRetailer = function (retailerId, customerId, boughtProducts) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var retailer, customer;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Retailer_model_1.Retailer.getOne(retailerId)];
                    case 1:
                        retailer = _a.sent();
                        retailer.productsAvailable = retailer.productsAvailable - boughtProducts;
                        retailer.productsSold = retailer.productsSold + boughtProducts;
                        return [4, Customer_model_1.Customer.getOne(customerId)];
                    case 2:
                        customer = _a.sent();
                        customer.productsBought = customer.productsBought + boughtProducts;
                        return [4, retailer.save()];
                    case 3:
                        _a.sent();
                        return [4, customer.save()];
                    case 4:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    tslib_1.__decorate([
        convector_core_controller_1.Invokable(),
        tslib_1.__param(0, convector_core_controller_1.Param(supplychainchaincode_model_1.Supplychainchaincode))
    ], SupplychainchaincodeController.prototype, "create", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable(),
        tslib_1.__param(0, convector_core_controller_1.Param(Supplier_model_1.Supplier))
    ], SupplychainchaincodeController.prototype, "createSupplier", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable(),
        tslib_1.__param(0, convector_core_controller_1.Param(Manufacturer_model_1.Manufacturer))
    ], SupplychainchaincodeController.prototype, "createManufacturer", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable(),
        tslib_1.__param(0, convector_core_controller_1.Param(Distributor_model_1.Distributor))
    ], SupplychainchaincodeController.prototype, "createDistributor", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable(),
        tslib_1.__param(0, convector_core_controller_1.Param(Retailer_model_1.Retailer))
    ], SupplychainchaincodeController.prototype, "createRetailer", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable(),
        tslib_1.__param(0, convector_core_controller_1.Param(Customer_model_1.Customer))
    ], SupplychainchaincodeController.prototype, "createCustomer", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable()
    ], SupplychainchaincodeController.prototype, "getAllSuppliers", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable(),
        tslib_1.__param(0, convector_core_controller_1.Param(yup.string()))
    ], SupplychainchaincodeController.prototype, "getSupplierById", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable()
    ], SupplychainchaincodeController.prototype, "getAllManufacturers", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable(),
        tslib_1.__param(0, convector_core_controller_1.Param(yup.string()))
    ], SupplychainchaincodeController.prototype, "getManufacturerById", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable()
    ], SupplychainchaincodeController.prototype, "getAllDistributors", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable(),
        tslib_1.__param(0, convector_core_controller_1.Param(yup.string()))
    ], SupplychainchaincodeController.prototype, "getDistributorById", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable()
    ], SupplychainchaincodeController.prototype, "getAllRetailers", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable(),
        tslib_1.__param(0, convector_core_controller_1.Param(yup.string()))
    ], SupplychainchaincodeController.prototype, "getRetailerById", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable()
    ], SupplychainchaincodeController.prototype, "getAllCustomers", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable(),
        tslib_1.__param(0, convector_core_controller_1.Param(yup.string()))
    ], SupplychainchaincodeController.prototype, "getCustomerById", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable()
    ], SupplychainchaincodeController.prototype, "getAllModels", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable(),
        tslib_1.__param(0, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(1, convector_core_controller_1.Param(yup.number()))
    ], SupplychainchaincodeController.prototype, "fetchRawMaterial", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable(),
        tslib_1.__param(0, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(1, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(2, convector_core_controller_1.Param(yup.number()))
    ], SupplychainchaincodeController.prototype, "getRawMaterialFromSupplier", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable(),
        tslib_1.__param(0, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(1, convector_core_controller_1.Param(yup.number())),
        tslib_1.__param(2, convector_core_controller_1.Param(yup.number()))
    ], SupplychainchaincodeController.prototype, "createProducts", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable(),
        tslib_1.__param(0, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(1, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(2, convector_core_controller_1.Param(yup.number()))
    ], SupplychainchaincodeController.prototype, "sendProductsToDistribution", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable(),
        tslib_1.__param(0, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(1, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(2, convector_core_controller_1.Param(yup.number()))
    ], SupplychainchaincodeController.prototype, "orderProductsFromDistributor", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable(),
        tslib_1.__param(0, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(1, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(2, convector_core_controller_1.Param(yup.number()))
    ], SupplychainchaincodeController.prototype, "receiveProductsFromDistributor", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable(),
        tslib_1.__param(0, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(1, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(2, convector_core_controller_1.Param(yup.number()))
    ], SupplychainchaincodeController.prototype, "buyProductsFromRetailer", null);
    SupplychainchaincodeController = tslib_1.__decorate([
        convector_core_controller_1.Controller('supplychainchaincode')
    ], SupplychainchaincodeController);
    return SupplychainchaincodeController;
}(convector_core_controller_1.ConvectorController));
exports.SupplychainchaincodeController = SupplychainchaincodeController;
//# sourceMappingURL=supplychainchaincode.controller.js.map