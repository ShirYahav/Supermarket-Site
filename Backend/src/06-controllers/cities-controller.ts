import express, { NextFunction, Request, Response } from "express";
import logic from "../05-logic/cities-logic";

const router = express.Router();

router.get("/cities", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cities = await logic.getAllCities();
        response.json(cities);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;