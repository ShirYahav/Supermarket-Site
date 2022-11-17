import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItemModel } from '../models/cart-item.model';
import { ShoppingCartModel } from '../models/shopping-cart.model';
import { addCartItemAction, addShoppingCartAction, CartAction, clearCartAction, deleteCartItemAction, getCartItemsByShoppingCartAction } from '../redux/cart-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  //Shopping Cart
  public async addCart(): Promise<ShoppingCartModel> {
    
    const newCart = new ShoppingCartModel();
    
    const addedCart = await firstValueFrom(this.http.post<ShoppingCartModel>(environment.addCartUrl, newCart));
    
    store.dispatch(addShoppingCartAction(addedCart));
    
    return addedCart;
  }

  public async getCartByCustomerId(): Promise<ShoppingCartModel> {
    
    const shoppingCart = await firstValueFrom(this.http.get<ShoppingCartModel>(environment.cartByCustomerUrl));
        
    return shoppingCart;
  }

  //Cart Items
  public async getCartItemsByShoppingCart(shoppingCartId: string): Promise<CartItemModel[]> {
    const cartItems = await firstValueFrom(this.http.get<CartItemModel[]>(environment.cartItemsByShoppingCartUrl + shoppingCartId));
    const action: CartAction = getCartItemsByShoppingCartAction(cartItems);
    store.dispatch(action);
    return cartItems;
  }

  public async addCartItem(cartItem: CartItemModel): Promise<CartItemModel> {

    const addedCartItem = await firstValueFrom(this.http.post<CartItemModel>(environment.cartItemsUrl, cartItem));

    store.dispatch(addCartItemAction(addedCartItem));

    return addedCartItem;
  }

  public async deleteCartItem(_id: string): Promise<void> {
    await firstValueFrom(this.http.delete(environment.cartItemsUrl + _id));
    store.dispatch(deleteCartItemAction(_id));
  }

  public async clearCart(shoppingCartId: string): Promise<void> {
    await firstValueFrom(this.http.delete(environment.clearCartUrl + shoppingCartId));
    store.dispatch(clearCartAction(shoppingCartId));
  }

}
