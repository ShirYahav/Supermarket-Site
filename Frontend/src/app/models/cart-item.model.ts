import { ItemModel } from "./item.model";
import { ShoppingCartModel } from "./shopping-cart.model";

export class CartItemModel {
    public _id: string;
    public itemId: string; 
    public item: ItemModel;
    public quantity: number;
    public totalPrice: number;
    public shoppingCartId: string;
    public shoppingCart: ShoppingCartModel;
}