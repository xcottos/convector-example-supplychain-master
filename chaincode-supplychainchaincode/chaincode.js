"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var convector_core_controller_1 = require("@worldsibu/convector-core-controller");
var convector_core_storage_1 = require("@worldsibu/convector-core-storage");
var convector_storage_stub_1 = require("@worldsibu/convector-storage-stub");
var fabric_chaincode_utils_1 = require("@theledger/fabric-chaincode-utils");
var convector_core_errors_1 = require("@worldsibu/convector-core-errors");
var config_1 = require("./config");
var Chaincode = (function (_super) {
    tslib_1.__extends(Chaincode, _super);
    function Chaincode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.initialized = false;
        return _this;
    }
    Chaincode.prototype.Init = function (stub) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, _super.prototype.Init.call(this, stub)
                            .catch(function (e) {
                            var err = new convector_core_errors_1.ChaincodeInitializationError(e);
                            throw new fabric_chaincode_utils_1.ChaincodeError(err.toString());
                        })];
                    case 1:
                        response = _a.sent();
                        return [2, response];
                }
            });
        });
    };
    Chaincode.prototype.Invoke = function (stub) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        convector_core_storage_1.BaseStorage.current = new convector_storage_stub_1.StubStorage(stub);
                        return [4, this.initControllers(new fabric_chaincode_utils_1.StubHelper(stub), [, 'true'])];
                    case 1:
                        _a.sent();
                        return [4, _super.prototype.Invoke.call(this, stub)
                                .catch(function (e) {
                                var err = new convector_core_errors_1.ChaincodeInvokationError(e);
                                throw new fabric_chaincode_utils_1.ChaincodeError(err.toString());
                            })];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    Chaincode.prototype.initControllers = function (stub, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var config, controllers;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.initialized && !args[0]) {
                            return [2];
                        }
                        return [4, this.getConfig(stub, args[0], !!args[1])];
                    case 1:
                        config = _a.sent();
                        if (!config) {
                            return [2];
                        }
                        return [4, config.getControllers()];
                    case 2:
                        controllers = _a.sent();
                        controllers.forEach(function (C) { return Object.assign(_this, convector_core_controller_1.getInvokables(C)); });
                        this.initialized = true;
                        return [2];
                }
            });
        });
    };
    Chaincode.prototype.getConfig = function (stub, refreshOrConfig, dontThrow) {
        if (dontThrow === void 0) { dontThrow = false; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ledgerConfig, config, e_1, config, e_2, paramConfig, e_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(refreshOrConfig !== 'true')) return [3, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, stub.getStateAsObject(this.name)];
                    case 2:
                        ledgerConfig = _a.sent();
                        if (ledgerConfig) {
                            console.log('Found config in ledger', ledgerConfig);
                        }
                        config = Array.isArray(ledgerConfig) ? ledgerConfig : ledgerConfig.controllers;
                        return [2, new config_1.Config(config)];
                    case 3:
                        e_1 = _a.sent();
                        return [3, 4];
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        config = config_1.Config.readFromFile();
                        console.log('Found config in package', config.dump());
                        return [4, stub.putState(this.name, { controllers: config.dump() })];
                    case 5:
                        _a.sent();
                        return [2, config];
                    case 6:
                        e_2 = _a.sent();
                        if (refreshOrConfig && refreshOrConfig === 'true' && !dontThrow) {
                            throw new convector_core_errors_1.ConfigurationInvalidError(e_2);
                        }
                        return [3, 7];
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        paramConfig = JSON.parse(refreshOrConfig);
                        console.log('Found config in param', paramConfig);
                        return [4, stub.putState(this.name, paramConfig)];
                    case 8:
                        _a.sent();
                        return [2, new config_1.Config(paramConfig)];
                    case 9:
                        e_3 = _a.sent();
                        if (!dontThrow) {
                            throw new convector_core_errors_1.ConfigurationInvalidError(e_3);
                        }
                        return [3, 10];
                    case 10: return [2];
                }
            });
        });
    };
    return Chaincode;
}(fabric_chaincode_utils_1.Chaincode));
exports.Chaincode = Chaincode;
//# sourceMappingURL=chaincode.js.map