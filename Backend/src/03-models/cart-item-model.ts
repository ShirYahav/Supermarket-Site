import { Document, model, Schema } from "mongoose";
import { ItemModel } from "./item-model";
import { ShoppingCartModel } from "./shopping-cart-model";

export interface ICartItemModel extends Document {
    itemId: Schema.Types.ObjectId; 
    quantity: number;
    totalPrice: number;
    shoppingCartId: Schema.Types.ObjectId; 
}

const CartItemSchema = new Schema<ICartItemModel>({
    shoppingCartId: {
        type: Schema.Types.ObjectId
    },
    quantity: {
        type: Number,
        required: [true, "Missing Quantity"],
        match: [/^\d+$/, "Quantity must be a whole number"],
        min: [0, "Quantity can't be negative"],
        max: [100, "Quantity can't exceed 100"]
    },
    totalPrice: {
        type: Number,
        min: [0, "Total Price can't be negative"],
        max: [10000, "Total Price can't exceed 10000"]
    },
    itemId: {
        type: Schema.Types.ObjectId
    }
}, {
    versionKey: false, 
    toJSON: { virtuals: true },
    id: false
});

CartItemSchema.virtual("item", {
    ref: ItemModel,
    localField: "itemId",
    foreignField: "_id", 
    justOne: true 
});

CartItemSchema.virtual("shoppingCart", {
    ref: ShoppingCartModel,
    localField: "shoppingCartId",
    foreignField: "_id", 
    justOne: true 
});

export const CartItemModel = model<ICartItemModel>("CartItemModel", CartItemSchema, "cartItems");