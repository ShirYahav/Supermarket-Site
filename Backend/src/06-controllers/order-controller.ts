import express, { NextFunction, Request, Response } from "express";
import verifyLoggedIn from "../02-middleware/verify-logged-in";
import { OrderModel } from "../03-models/order-model";
import logic from "../05-logic/order-logic";

const router = express.Router();

router.post("/orders", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const order = new OrderModel(request.body);
        const addedOrder = await logic.addOrder(order);
        response.status(201).json(addedOrder);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/orders", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const orders = await logic.getTotalOrdersNum();
        response.json(orders);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;