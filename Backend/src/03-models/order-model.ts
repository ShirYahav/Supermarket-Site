import { Document, model, Schema } from "mongoose";
import { CustomerModel } from "./customer-model";
import { ItemModel } from "./item-model";
import { ShoppingCartModel } from "./shopping-cart-model";

export interface IOrderModel extends Document {
    customerId: Schema.Types.ObjectId; 
    shoppingCartId: Schema.Types.ObjectId; 
    orderTotalPrice: number;
    shippingCity: string;
    shippingStreet: string;
    shippingDate: Date;
    placingOrderDate: Date;
    creditCard: number;
}

const OrderSchema = new Schema<IOrderModel>({
    customerId: {
        type: Schema.Types.ObjectId
    },
    shoppingCartId: {
        type: Schema.Types.ObjectId
    },
    orderTotalPrice: {
        type: Number,
        min: [0, "Total Price can't be negative"],
        max: [10000, "Total Price can't exceed 10000"]
    },
    shippingCity: {
        type: String,
        required: [true, "Missing city"],
        minlength: [2, "City name is too short"],
        trim: true
    },
    shippingStreet:{
        type: String,
        required: [true, "Missing street"],
        minlength: [2, "Street name is too short"],
        trim: true
    },
    shippingDate:{
        type: Date
    },
    placingOrderDate:{
        type: Date
    },
    creditCard:{
        type: Number,
        required: [true, "Missing Credit Card Number"],
        match: [/^\d+$/, "Credit Card number must be a whole number"],
        min: [0, "Credit Card number can't be negative"],
        minlength: [8, "Credit Card number is too short"],
        maxlength: [16, "Credit Card number is too long"]
    },
}, {
    versionKey: false, 
    toJSON: { virtuals: true },
    id: false
});

OrderSchema.virtual("customer", {
    ref: CustomerModel,
    localField: "customerId",
    foreignField: "_id", 
    justOne: true 
});

OrderSchema.virtual("shoppingCart", {
    ref: ShoppingCartModel,
    localField: "shoppingCartId",
    foreignField: "_id", 
    justOne: true 
});

OrderSchema.virtual("item", {
    ref: ItemModel,
    localField: "itemId",
    foreignField: "_id", 
    justOne: true 
});

export const OrderModel = model<IOrderModel>("OrderModel", OrderSchema, "orders");