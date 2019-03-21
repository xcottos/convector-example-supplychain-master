"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yup_1 = require("yup");
var isSchema = function (schema) { return 'validate' in schema; };
var ChaincodeTx = (function () {
    function ChaincodeTx(stub, identity) {
        this.stub = stub;
        this.identity = identity;
    }
    ChaincodeTx.prototype.getTransientValue = function (name, validator) {
        var schema = isSchema(validator) ? validator : yup_1.object()
            .transform(function (value) { return value instanceof validator ? value : new validator(value); });
        var transient = this.stub.getStub().getTransient();
        var transientValue = transient.get(name).toString('utf8');
        return schema.validate(transientValue);
    };
    return ChaincodeTx;
}());
exports.ChaincodeTx = ChaincodeTx;
//# sourceMappingURL=chaincode-tx.js.map