import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CustomerModel } from 'src/app/models/customer.model';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
})
export class AuthMenuComponent implements OnInit {

  public customer: CustomerModel;
  private unsubscribe: Unsubscribe;

  constructor() { }

  ngOnInit(): void {
    this.customer = store.getState().authState.customer;
    this.unsubscribe = store.subscribe(() => {
        this.customer = store.getState().authState.customer;
    });
}

  ngOnDestroy(): void {
    this.unsubscribe();
  }

}
