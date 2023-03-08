import { body, param } from "express-validator";

export const usernameParamValidationSchema = (name: string, msg: string = 'Invalid Username') => param(name).isString().escape().trim().isLength({ min: 3, max: 20 }).withMessage(msg);

export const usernameReqValidationSchema   = (name: string, msg: string = 'Invalid Username') => body(name).isString().escape().trim().isLength({ min: 3, max: 20 }).withMessage(msg);
export const passwordReqValidationSchema   = (name: string, msg: string = 'Invalid Password') => body(name).isString().escape().trim().isLength({ min: 8, max: 64 }).isStrongPassword({ minLowercase: 1, minUppercase: 1, minSymbols: 1, minNumbers: 1 }).withMessage(msg);
export const numberReqValidationSchema     = (name: string, min?: number, max?: number, msg: string = 'Invalid Number') => body(name).isNumeric().withMessage(msg);