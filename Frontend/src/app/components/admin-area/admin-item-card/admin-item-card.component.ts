import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemModel } from 'src/app/models/item.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-item-card',
  templateUrl: './admin-item-card.component.html',
  styleUrls: ['./admin-item-card.component.css']
})
export class AdminItemCardComponent  {

  public itemImage = environment.itemImage;

  @Input()
  public item: ItemModel;

  constructor(private router: Router) { }

}
