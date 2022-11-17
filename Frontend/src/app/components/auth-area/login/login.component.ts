import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { CustomerModel } from 'src/app/models/customer.model';
import { ShoppingCartModel } from 'src/app/models/shopping-cart.model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public customer: CustomerModel;
  public credentials = new CredentialsModel();
  public shoppingCart: ShoppingCartModel;
  public cartItems: CartItemModel[];

  constructor(
    private authService: AuthService,
    private router: Router, 
    private notifyService: NotifyService,
    private cartService: CartService) { }

  public async submit() {
    try {
      await this.authService.login(this.credentials);
      this.customer = store.getState().authState.customer;
      (this.customer.role === "User") ? this.router.navigateByUrl("/item-list"): this.router.navigateByUrl("/item-list-admin");
      
      const shoppingCartByCustomer = await this.cartService.getCartByCustomerId();
      this.shoppingCart = shoppingCartByCustomer;
      this.cartItems = await this.cartService.getCartItemsByShoppingCart(this.shoppingCart._id);

      (this.cartItems.length === 0) ? this.notifyService.success("Let's start Shopping") : this.notifyService.success("Let's continue Shopping");
      
    }
    catch (err: any) {
      this.notifyService.error(err);
    }
  }
  
}
