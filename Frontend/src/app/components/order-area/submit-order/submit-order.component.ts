import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { cityModel } from 'src/app/models/city.model';
import { CustomerModel } from 'src/app/models/customer.model';
import { OrderModel } from 'src/app/models/order.model';
import { ShoppingCartModel } from 'src/app/models/shopping-cart.model';
import store from 'src/app/redux/store';
import { CartService } from 'src/app/services/cart.service';
import { CitiesService } from 'src/app/services/cities.service';
import { NotifyService } from 'src/app/services/notify.service';
import { OrdersService } from 'src/app/services/orders.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-submit-order',
  templateUrl: './submit-order.component.html',
  styleUrls: ['./submit-order.component.css']
})
export class SubmitOrderComponent implements OnInit {
  
  public shoppingCart: ShoppingCartModel;
  public cartItems: CartItemModel[];
  public itemImage = environment.itemImage;
  public totalPrice: number;
  public cities: cityModel[];
  public customer: CustomerModel;

  public searchText:string ='';
  public text: string = '';

  public order= new OrderModel();

  public currentDate: any = new Date();

  @ViewChild('textContainer') textContainer!:ElementRef;

  constructor(
    private cartService: CartService,
    private notifyService: NotifyService,
    private citiesService: CitiesService,
    private ordersService: OrdersService,
    private dialog: MatDialog,
    private router: Router) { }

  async ngOnInit() {
    try{

      this.customer = store.getState().authState.customer;

      this.cities = await this.citiesService.getAllCities();

      const shoppingCartByCustomer = await this.cartService.getCartByCustomerId();
      this.shoppingCart = shoppingCartByCustomer;

      this.cartItems = await this.cartService.getCartItemsByShoppingCart(this.shoppingCart._id);

      if(this.cartItems?.length !== 0) {
        this.totalPrice = this.cartItems.map(cartItem => cartItem.totalPrice)
        .reduce((a,b) => {return a + b});
      }

    }
    catch(err: any) {
      this.notifyService.error(err);
    }
  }

  public async fillAddress() {
    try{

      if(this.customer) {
        this.order.shippingCity = this.customer.city;
        this.order.shippingStreet = this.customer.street;  
      }
    }
    catch(err:any) {
      this.notifyService.error(err);
    }
  }

  public async placeOrder(){
    try{
      this.order.customerId = this.customer._id;
      this.order.shoppingCartId = this.shoppingCart._id;
      this.order.orderTotalPrice = this.totalPrice;
      this.order.placingOrderDate = new Date();
      await this.ordersService.addOrder(this.order);
      
      await this.cartService.clearCart(this.shoppingCart._id);
      this.cartItems = [];
      this.notifyService.success("Your Order Has Been Placed");
      this.router.navigateByUrl("item-list");
    }
    catch (err: any) {
      this.notifyService.error(err);
    }
  }
}
