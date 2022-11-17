import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderModel } from '../models/order.model';
import { addOrderAction, getTotalOrdersNumAction, OrdersAction } from '../redux/orders-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  public async getTotalOrdersNum(): Promise<number> {
    let ordersNumber = store.getState().ordersState.ordersNumber;
    if(!ordersNumber) {
      ordersNumber = await firstValueFrom(this.http.get<number>(environment.ordersUrl));
      const action: OrdersAction = getTotalOrdersNumAction(ordersNumber);
      store.dispatch(action)
    }
    return ordersNumber;
  }

  public async addOrder(order: OrderModel): Promise<OrderModel> {

    const formData = new FormData();
    formData.append("orderTotalPrice", order.orderTotalPrice.toString());
    formData.append("shippingCity", order.shippingCity);
    formData.append("shippingStreet", order.shippingStreet);
    formData.append("shippingDate", order.shippingDate.toString());
    formData.append("creditCard", order.creditCard.toString());

    const addedOrder = await firstValueFrom(this.http.post<OrderModel>(environment.ordersUrl, formData));

    store.dispatch(addOrderAction(addedOrder));

    return addedOrder;
  }
}
