import { Document, model, Schema } from "mongoose";
import RoleModel from "./role-model";

export interface ICustomerModel extends Document {
    firstName: string;
    lastName: string;
    email: string;
    customerId: number;
    password: string;
    city: string;
    street: string;
    role: RoleModel;
}

const CustomerSchema = new Schema<ICustomerModel>({
    firstName: {
        type: String,
        required: [true, "Missing first name"],
        minlength: [2, "First name is too short"],
        maxlength: [20, "First name is too long"],
        match: [/^([a-zA-Z]*)$/, "Invalid First Name"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Missing last name"],
        minlength: [2, "Last name is too short"],
        maxlength: [20, "Last name is too long"],
        match: [/^([a-zA-Z]*)$/, "Invalid Last Name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Missing Email"],
        minlength: [5, "Last name is too short"],
        maxlength: [150, "Last name is too long"],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email"],
        trim: true,
        unique: true
    },
    customerId: {
        type: Number,
        required: [true, "Missing Id number"],
        length: [9, "Id number should be 9 digits"],
        match: [/^[0-9]*$/, "Id must contain only numbers"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Missing Password"],
        minlength: [8, "Password is too short"],
        match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must contain at least one letter or number"],
        trim: true
    },
    city: {
        type: String,
        required: [true, "Missing city"],
        minlength: [2, "City name is too short"],
        match: [/.*\S.*/, "Invalid City"],
        trim: true
    },
    street: {
        type: String,
        required: [true, "Missing street"],
        minlength: [2, "Street name is too short"],
        maxlength: [25, "Street name is too long"],
        match: [/.*\S.*/, "Invalid Street"],
        trim: true
    },
    role: {
        type: String
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});


export const CustomerModel = model<ICustomerModel>("CustomerModel", CustomerSchema, "customers");
