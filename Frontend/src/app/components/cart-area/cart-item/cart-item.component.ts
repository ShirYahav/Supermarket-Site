import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { DialogDataModel } from 'src/app/models/dialog-data.model';
import { ItemModel } from 'src/app/models/item.model';
import { ShoppingCartModel } from 'src/app/models/shopping-cart.model';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  
  public data: DialogDataModel;
  public itemImage = environment.itemImage;
  public item: ItemModel;
  public cartItem = new CartItemModel();
  public cartItems: CartItemModel[];
  public shoppingCart: ShoppingCartModel;

  constructor(
    private dialogRef: MatDialogRef<CartItemComponent>, 
    private cartService: CartService,
    private notifyService: NotifyService,
    @Inject(MAT_DIALOG_DATA) data: DialogDataModel) {this.data = data}

  public async save() {
    try {
      this.dialogRef.close();

      this.shoppingCart = await this.cartService.getCartByCustomerId();
      this.cartItem.itemId = this.data.item._id;

      this.cartItem.totalPrice = this.cartItem.quantity * this.data.item.price;

      this.cartItem.shoppingCartId = this.shoppingCart._id;

      await this.cartService.addCartItem(this.cartItem);

    }
    catch (err: any) {
      this.notifyService.error(err);
    }
  }

  public close() {
    this.dialogRef.close();
  }

}
