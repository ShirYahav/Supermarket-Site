import { OrderModel } from "../models/order.model";


export class OrdersState {
    public orders: OrderModel[] = [];
    public ordersNumber: number = null;
}

export enum OrdersActionType {
    GetTotalOrdersNum = " GetTotalOrdersNum",
    AddOrder = "AddOrder"
}

export interface OrdersAction {
    type: OrdersActionType;
    payload: any;
}

export function getTotalOrdersNumAction(ordersNumber: number): OrdersAction {
    return { type: OrdersActionType.GetTotalOrdersNum, payload: ordersNumber };
}

export function addOrderAction(order: OrderModel): OrdersAction {
    return { type: OrdersActionType.AddOrder, payload: order };
}

export function ordersReducer(currentState = new OrdersState(), action: OrdersAction): OrdersState {

    const newState = { ...currentState };

    switch (action.type) {

        case OrdersActionType.GetTotalOrdersNum:
            newState.ordersNumber = action.payload;
            break;

        case OrdersActionType.AddOrder:
            newState.orders.push(action.payload);
            break;

    }

    return newState;

}