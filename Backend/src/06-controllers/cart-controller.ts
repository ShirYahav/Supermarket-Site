import express, { NextFunction, Request, Response } from "express";
import cyber from "../01-utils/cyber";
import verifyLoggedIn from "../02-middleware/verify-logged-in";
import { CartItemModel } from "../03-models/cart-item-model";
import { ShoppingCartModel } from "../03-models/shopping-cart-model";
import logic from "../05-logic/cart-logic";

const router = express.Router();

//Shopping Cart
router.post("/create-shopping-cart", verifyLoggedIn , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const shoppingCart = new ShoppingCartModel(request.body);
        const customerId = cyber.getCustomerFromToken(request.header("authorization"))._id;
        shoppingCart.customerId = customerId;
        shoppingCart.createdAt = new Date();
        const addedCart = await logic.addShoppingCart(shoppingCart);
        response.status(201).json(addedCart);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/shopping-cart-by-customer", verifyLoggedIn , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const customerId = cyber.getCustomerFromToken(request.header("authorization"))._id;
        const shoppingCart = await logic.getShoppingCartByCustomerId(customerId);
        response.json(shoppingCart[0]);
    }
    catch (err: any) {
        next(err);
    }
});

//Cart Items
router.post("/cart-items", verifyLoggedIn , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cartItem = new CartItemModel(request.body);
        const addedCartItem = await logic.addCartItem(cartItem);
        response.status(201).json(addedCartItem);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/cart-items/:_id", verifyLoggedIn , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const cartItem = await logic.getOneCartItem(_id);
        response.json(cartItem);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/cart-items-by-shopping-cart/:shoppingCartId", verifyLoggedIn , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const shoppingCartId = request.params.shoppingCartId;
        const cartItems = await logic.getCartItemsByShoppingCart(shoppingCartId);
        response.json(cartItems);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/cart-items/:_id", verifyLoggedIn , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await logic.deleteCartItem(_id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/clear-cart/:shoppingCartId", verifyLoggedIn , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const shoppingCartId = request.params.shoppingCartId;
        await logic.clearCart(shoppingCartId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;