"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.myRequestHeaders = void 0;
const express_validator_1 = require("express-validator");
exports.myRequestHeaders = [
    (0, express_validator_1.header)("authorization")
        .exists({ checkFalsy: true })
        .withMessage("Missing Authorization Header") // you can specify the message to show if a validation has failed
        .bail() // not necessary, but it stops execution if previous validation failed
        //you can chain different validation rules
        .contains("mysecrettoken")
        .withMessage("Authorization Token is invalid"),
];
function validateRequest(request, response, next) {
    const validationErrors = (0, express_validator_1.validationResult)(request);
    const errorMessages = [];
    for (const e of validationErrors.array()) {
        errorMessages.push(e.msg);
    }
    if (!validationErrors.isEmpty()) {
        return response.status(403).json({ errors: errorMessages });
    }
    next();
}
exports.validateRequest = validateRequest;
