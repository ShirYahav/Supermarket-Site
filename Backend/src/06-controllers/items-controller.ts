import express, { NextFunction, Request, Response } from "express";
import path from "path";
import verifyAdmin from "../02-middleware/verify-admin";
import verifyLoggedIn from "../02-middleware/verify-logged-in";
import { ItemModel } from "../03-models/item-model";
import logic from "../05-logic/items-logic";

const router = express.Router();

router.get("/items", verifyLoggedIn ,  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const items = await logic.getAllItems();
        response.json(items);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/items-number", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const items = await logic.getTotalItemsNum();
        response.json(items);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/items/:_id", verifyLoggedIn , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const item = await logic.getOneItem(_id);
        response.json(item);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/items-by-category/:categoryId", verifyLoggedIn , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categoryId = request.params.categoryId;
        const items = await logic.getItemsByCategory(categoryId);
        response.json(items);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/items", verifyAdmin , async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const item = new ItemModel(request.body);
        const addedItem = await logic.addItem(item);
        response.status(201).json(addedItem);
    }
    catch (err: any) {
        next(err);
    }
});

router.put("/items/:_id", verifyAdmin , async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body._id = request.params._id;
        request.body.image = request.files?.image;
        const item = new ItemModel(request.body);
        const updatedItem = await logic.updateItem(item);
        response.json(updatedItem);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/items/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "assets", "images", "items", imageName);
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;