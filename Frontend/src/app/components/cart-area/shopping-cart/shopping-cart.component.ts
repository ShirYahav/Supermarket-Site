import { Component, OnInit } from '@angular/core';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { ShoppingCartModel } from 'src/app/models/shopping-cart.model';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public shoppingCart: ShoppingCartModel;
  public cartItems: CartItemModel[];
  public totalPrice: number;

  constructor(
    private cartService: CartService,
    private notifyService: NotifyService) { }

  async ngOnInit() {
    try {
      const shoppingCartByCustomer = await this.cartService.getCartByCustomerId();
      this.shoppingCart = shoppingCartByCustomer;
  
      this.cartItems = await this.cartService.getCartItemsByShoppingCart(this.shoppingCart._id);

      if(this.cartItems.length !== 0) {
        this.totalPrice = this.cartItems.map(cartItem => cartItem.totalPrice)
        .reduce((a,b) => {return a + b});

      }
    }
    catch (err: any) {
      this.notifyService.error(err);
    }
  }

   

  async deleteThisCartItem(_id: string) {
    try {
      await this.cartService.deleteCartItem(_id);
      if(this.cartItems.length !== 0) {
        this.totalPrice = this.cartItems.map(cartItem => cartItem.totalPrice)
        .reduce((a,b) => {return a + b});
      }
    }
    catch(err: any) {
      this.notifyService.error(err);
    }
  }

  async clearCart(shoppingCartId: string) {
    try{
      if (window.confirm('Are you sure you want to continue?')){
        await this.cartService.clearCart(shoppingCartId);
        this.cartItems = [];
        this.notifyService.success('Your cart is clear');
      }
    }
    catch(err: any) {
      this.notifyService.error(err);
    }
  }
}
