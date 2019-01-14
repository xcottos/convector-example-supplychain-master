"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = require("fs");
var convector_core_errors_1 = require("@worldsibu/convector-core-errors");
var defaultPath = process.cwd() + "/chaincode.config.json";
var Config = (function () {
    function Config(config) {
        this.config = config;
    }
    Config.readFromFile = function (path) {
        if (path === void 0) { path = defaultPath; }
        var config = {
            controllers: []
        };
        var fileContent;
        try {
            fileContent = fs_1.readFileSync(path, 'utf8');
        }
        catch (e) {
            throw new convector_core_errors_1.ConfigurationFileOpenError(e, path);
        }
        try {
            config = JSON.parse(fileContent);
        }
        catch (e) {
            throw new convector_core_errors_1.ConfigurationParseError(e, fileContent);
        }
        return new Config(config.controllers);
    };
    Config.prototype.getPackages = function () {
        return this.config
            .reduce(function (result, config) {
            return (tslib_1.__assign({}, result, (_a = {}, _a[config.name] = config.version, _a)));
            var _a;
        }, {});
    };
    Config.prototype.getControllers = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var controllers;
            return tslib_1.__generator(this, function (_a) {
                controllers = this.config
                    .map(function (config) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var pkg, ctrl;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, Promise.resolve().then(function () { return require(config.name); }).catch(function (e) { throw new convector_core_errors_1.ControllerImportError(e, config.name); })];
                            case 1:
                                pkg = _a.sent();
                                ctrl = pkg[config.controller];
                                if (!ctrl) {
                                    throw new convector_core_errors_1.ControllerMissingError(config.name, config.controller);
                                }
                                return [2, ctrl];
                        }
                    });
                }); });
                return [2, Promise.all(controllers)];
            });
        });
    };
    Config.prototype.dump = function () {
        return this.config;
    };
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=config.js.map