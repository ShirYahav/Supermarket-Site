import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public numberOfItems: number; 
  public numberOfOrders: number; 
  
  constructor(private itemsService: ItemsService, 
    private ordersService: OrdersService,
    private router: Router) { }

  async ngOnInit() {
    this.numberOfItems = await this.itemsService.getTotalItemsNum();
    this.numberOfOrders = await this.ordersService.getTotalOrdersNum();
  }

  public login() {
    this.router.navigateByUrl("/login")
  }

  public register() {
    this.router.navigateByUrl("/register")
  }

}
