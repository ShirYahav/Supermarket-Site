import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItemModel } from 'src/app/models/cart-item.model';

@Component({
  selector: 'app-cart-item-li',
  templateUrl: './cart-item-li.component.html',
  styleUrls: ['./cart-item-li.component.css']
})
export class CartItemLiComponent {
  
  @Input()
  public cartItem: CartItemModel;

  @Output()
  public deleteCItem = new EventEmitter<string>();

  constructor() { }

  public deleteCartItem (_id: string) {
    this.deleteCItem.emit(_id)
  }
}
