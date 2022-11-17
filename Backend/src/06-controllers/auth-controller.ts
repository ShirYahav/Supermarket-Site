import express, { NextFunction, Request, Response } from "express";
import { CredentialsModel } from "../03-models/credentials-model";
import { CustomerModel } from "../03-models/customer-model";
import logic from "../05-logic/auth-logic";

const router = express.Router();

router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const customer = new CustomerModel(request.body);
        const token = await logic.register(customer);
        response.status(201).json(token);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body);
        const token = await logic.login(credentials);
        response.json(token);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/auth/is-taken", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const customer = new CustomerModel(request.body);
        const isEmail = await logic.isEmailTaken(customer)
        const isId = await logic.isCustomerIdTaken(customer)
        if(isEmail || isId){
            response.json(true);
        }
        response.json(false);
    }
    catch (err: any) {
        next(err);
    }
});


export default router;