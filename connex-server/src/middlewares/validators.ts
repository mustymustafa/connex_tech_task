import { header, validationResult } from "express-validator";
 import express, { Request, Response } from "express";
export const myRequestHeaders = [
  header("authorization")
    .exists({ checkFalsy: true })
    .withMessage("Missing Authorization Header") // you can specify the message to show if a validation has failed
    .bail() // not necessary, but it stops execution if previous validation failed
    //you can chain different validation rules
    .contains("mysecrettoken")
    .withMessage("Authorization Token is invalid"),
];

export function validateRequest(request: Request, response: Response, next:any) {
  const validationErrors = validationResult(request);
  const errorMessages = [];

  for (const e of validationErrors.array()) {
    errorMessages.push(e.msg);
  }

  if (!validationErrors.isEmpty()) {
    return response.status(403).json({ errors: errorMessages });
  }
  next();
}