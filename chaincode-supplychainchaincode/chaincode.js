"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var convector_storage_stub_1 = require("@worldsibu/convector-storage-stub");
var fabric_shim_1 = require("fabric-shim");
var fabric_chaincode_utils_1 = require("@theledger/fabric-chaincode-utils");
var convector_core_1 = require("@worldsibu/convector-core");
var config_1 = require("./config");
var chaincode_tx_1 = require("./chaincode-tx");
function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
var Chaincode = (function (_super) {
    tslib_1.__extends(Chaincode, _super);
    function Chaincode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.initialized = false;
        return _this;
    }
    Chaincode.prototype.Init = function (stub) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var e_1, err;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, _super.prototype.Init.call(this, stub)];
                    case 1: return [2, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        err = new convector_core_1.ChaincodeInitializationError(e_1);
                        return [2, fabric_shim_1.error(Buffer.from(JSON.stringify(new fabric_chaincode_utils_1.ChaincodeError(err.toString()))))];
                    case 3: return [2];
                }
            });
        });
    };
    Chaincode.prototype.Invoke = function (stub) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var invokeRes, e_2, err;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        convector_core_1.BaseStorage.current = new convector_storage_stub_1.StubStorage(stub);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4, this.initControllers(new fabric_chaincode_utils_1.StubHelper(stub), [, 'true'])];
                    case 2:
                        _a.sent();
                        return [4, _super.prototype.Invoke.call(this, stub)];
                    case 3:
                        invokeRes = _a.sent();
                        if (invokeRes.status === 500) {
                            return [2, fabric_shim_1.error(Buffer.from(JSON.stringify(invokeRes.message.toString())))];
                        }
                        return [2, invokeRes];
                    case 4:
                        e_2 = _a.sent();
                        err = new convector_core_1.ChaincodeInvokationError(e_2);
                        return [2, fabric_shim_1.error(Buffer.from(JSON.stringify(new fabric_chaincode_utils_1.ChaincodeError(err.toString()))))];
                    case 5: return [2];
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
                        controllers.forEach(function (C) {
                            var obj;
                            var ctrlInvokables = convector_core_1.getInvokables(C);
                            try {
                                obj = new C();
                            }
                            catch (e) {
                                throw new convector_core_1.ControllerInstantiationError(e, ctrlInvokables.namespace);
                            }
                            var injectedInvokables = Object.keys(ctrlInvokables.invokables)
                                .map(function (k) { return [k, ctrlInvokables.namespace + "_" + k]; })
                                .reduce(function (result, _a) {
                                var fnName = _a[0], internalName = _a[1];
                                return (tslib_1.__assign({}, result, (_b = {}, _b[internalName] = isFunction(obj[fnName]) ?
                                    function (stubHelper, _args) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var identity, fingerprint;
                                        return tslib_1.__generator(this, function (_a) {
                                            identity = new fabric_shim_1.ClientIdentity(stubHelper.getStub());
                                            fingerprint = identity.getX509Certificate().fingerPrint;
                                            return [2, obj[fnName].call(this, stubHelper, _args, {
                                                    sender: {
                                                        value: fingerprint
                                                    },
                                                    tx: {
                                                        value: new chaincode_tx_1.ChaincodeTx(stubHelper, identity)
                                                    }
                                                })];
                                        });
                                    }); } : obj[fnName], _b)));
                                var _b;
                            }, (_a = {}, _a[ctrlInvokables.namespace] = obj, _a));
                            return Object.assign(_this, injectedInvokables);
                            var _a;
                        });
                        this.initialized = true;
                        return [2];
                }
            });
        });
    };
    Chaincode.prototype.getConfig = function (stub, refreshOrConfig, dontThrow) {
        if (dontThrow === void 0) { dontThrow = false; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ledgerConfig, config, e_3, config, e_4, paramConfig, e_5;
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
                        e_3 = _a.sent();
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
                        e_4 = _a.sent();
                        if (refreshOrConfig && refreshOrConfig === 'true' && !dontThrow) {
                            throw new convector_core_1.ConfigurationInvalidError(e_4);
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
                        e_5 = _a.sent();
                        if (!dontThrow) {
                            throw new convector_core_1.ConfigurationInvalidError(e_5);
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