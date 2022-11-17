import { Document, model, Schema } from "mongoose";
import { CustomerModel } from "./customer-model";

export interface IShoppingCartModel extends Document {
    createdAt: Date;
    customerId: Schema.Types.ObjectId;
}

const ShoppingCartSchema = new Schema<IShoppingCartModel>({
    createdAt: {
        type: Date,
    },
    customerId: {
        type: Schema.Types.ObjectId
    }
}, {
    versionKey: false, 
    toJSON: { virtuals: true },
    id: false
});

ShoppingCartSchema.virtual("customer", {
    ref: CustomerModel,
    localField: "customerId",
    foreignField: "_id", 
    justOne: true 
});

export const ShoppingCartModel = model<IShoppingCartModel>("ShoppingCartModel", ShoppingCartSchema, "shoppingCarts");