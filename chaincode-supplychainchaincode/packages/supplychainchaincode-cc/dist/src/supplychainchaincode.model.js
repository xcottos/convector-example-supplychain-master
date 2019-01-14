"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var yup = require("yup");
var convector_core_model_1 = require("@worldsibu/convector-core-model");
var Supplychainchaincode = (function (_super) {
    tslib_1.__extends(Supplychainchaincode, _super);
    function Supplychainchaincode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'io.worldsibu.supplychainchaincode';
        return _this;
    }
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Required()
    ], Supplychainchaincode.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], Supplychainchaincode.prototype, "name", void 0);
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], Supplychainchaincode.prototype, "created", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], Supplychainchaincode.prototype, "modified", void 0);
    return Supplychainchaincode;
}(convector_core_model_1.ConvectorModel));
exports.Supplychainchaincode = Supplychainchaincode;
//# sourceMappingURL=supplychainchaincode.model.js.map