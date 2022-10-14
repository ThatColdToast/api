import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const errorMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).send({ errors });
        // throw new Error(errors.array().map(err => err.msg).join(', '));
    
    next();
};