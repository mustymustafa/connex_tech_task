"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
function validateRequest(request, response, next) {
    const validationErrors = validationResult(req);
    const errorMessages = [];
    for (const e of validationErrors.array()) {
        errorMessages.push(e.msg);
    }
    if (!validationErrors.isEmpty()) {
        return res.status(403).json({ errors: errorMessages });
    }
    next();
}
exports.validateRequest = validateRequest;
