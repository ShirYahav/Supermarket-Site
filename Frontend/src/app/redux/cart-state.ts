import { CartItemModel } from "../models/cart-item.model";
import { ShoppingCartModel } from "../models/shopping-cart.model";


export class CartState {
    public cartItems: CartItemModel[] = [];
    public shoppingCarts: ShoppingCartModel[] = [];
}

export enum CartActionType {
    AddShoppingCart ="AddShoppingCart",
    AddCartItem ="AddCartItem",
    GetCartItemsByShoppingCart ="GetCartItemsByShoppingCart",
    DeleteCartItem ="DeleteCartItem",
    ClearCart ="ClearCart"
}

export interface CartAction {
    type: CartActionType;
    payload: any;
}

export function addShoppingCartAction(cart: ShoppingCartModel): CartAction {
    return { type: CartActionType.AddShoppingCart, payload: cart };
}

export function addCartItemAction(cartItem: CartItemModel): CartAction {
    return { type: CartActionType.AddCartItem, payload: cartItem };
}

export function getCartItemsByShoppingCartAction(cartItems: CartItemModel[]): CartAction {
    return { type: CartActionType.GetCartItemsByShoppingCart, payload: cartItems };
}

export function deleteCartItemAction(_id: string): CartAction {
    return { type: CartActionType.DeleteCartItem, payload: _id };
}

export function clearCartAction(shoppingCartId: string): CartAction {
    return { type: CartActionType.ClearCart, payload: shoppingCartId };
}

export function cartReducer(currentState = new CartState(), action: CartAction): CartState {

    const newState = { ...currentState };

    switch (action.type) {

        case CartActionType.AddShoppingCart:
            newState.shoppingCarts.push(action.payload);
            break;

        case CartActionType.AddCartItem:
            newState.cartItems.push(action.payload);
            break;

        case CartActionType.GetCartItemsByShoppingCart:
            newState.cartItems = action.payload;
            break;

        case CartActionType.DeleteCartItem:
            const indexToDelete = newState.cartItems.findIndex(i => i._id === action.payload);
            if (indexToDelete >= 0) {
                newState.cartItems.splice(indexToDelete, 1);
            }
            break;

        case CartActionType.ClearCart:
            newState.cartItems.filter(i => i.shoppingCartId === action.payload);
            break;

    }

    return newState;

}