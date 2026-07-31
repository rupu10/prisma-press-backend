import { NextFunction, Request, Response } from "express";

const reusable = (req: Request, res: Response, next: NextFunction ) => {
    const payload = req.body
    return payload
}