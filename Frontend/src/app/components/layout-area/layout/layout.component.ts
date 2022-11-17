import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CustomerModel } from 'src/app/models/customer.model';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public token: string;
  public customer: CustomerModel;
  private unsubscribe: Unsubscribe;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.customer = store.getState().authState.customer;
    this.unsubscribe = store.subscribe(() => {
      this.token = store.getState().authState.token;
      this.customer = store.getState().authState.customer;
    });
    
  }
  
  ngOnDestroy(): void {
    this.unsubscribe();
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

}
