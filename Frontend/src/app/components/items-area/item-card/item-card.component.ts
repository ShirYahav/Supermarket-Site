import { Component, Input } from '@angular/core';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { ItemModel } from 'src/app/models/item.model';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CartItemComponent } from '../../cart-area/cart-item/cart-item.component';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent  {

  public cartItem: CartItemModel;

  public itemImage = environment.itemImage;

  @Input()
  public item: ItemModel;

  constructor(private dialog: MatDialog) { }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      item: this.item,
    };

    dialogConfig.panelClass = "custom-dialog-container";

    this.dialog.open(CartItemComponent, dialogConfig);
  }

}
