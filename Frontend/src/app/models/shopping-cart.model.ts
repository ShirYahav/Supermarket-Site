import { CustomerModel } from "./customer.model";

export class ShoppingCartModel {
    public _id: string;
    public createdAt: Date;
    public customerId: string; 
    public customer: CustomerModel
}