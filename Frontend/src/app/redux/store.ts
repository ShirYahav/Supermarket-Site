import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";
import { cartReducer } from "./cart-state";
import { itemsReducer } from "./items-state";
import { ordersReducer } from "./orders-state";

const reducers = combineReducers({ 
    authState: authReducer,
    itemsState: itemsReducer,
    cartState: cartReducer,
    ordersState: ordersReducer
 });

const store = createStore(reducers);

export default store;
