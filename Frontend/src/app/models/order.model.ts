import { CustomerModel } from "./customer.model";
import { ShoppingCartModel } from "./shopping-cart.model";

export class OrderModel {
    customerId: string; 
    customer : CustomerModel;
    shoppingCartId: string; 
    shoppingCart: ShoppingCartModel
    orderTotalPrice: number;
    shippingCity: string;
    shippingStreet: string;
    shippingDate: Date;
    placingOrderDate: Date;
    creditCard: number;
}