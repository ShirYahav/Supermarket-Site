import { ItemModel } from "../models/item.model";


export class ItemsState {
    public items: ItemModel[] = [];
    public itemsNumber: number = null;
}

export enum ItemsActionType {
    GetAllItems = "GetAllItems",
    GetTotalItemsNum = " GetTotalItemsNum",
    AddItem = "AddItem",
    UpdateItem = "UpdateItem"
}

export interface ItemsAction {
    type: ItemsActionType;
    payload: any;
}

export function getAllItemsAction(items: ItemModel[]): ItemsAction {
    return { type: ItemsActionType.GetAllItems, payload: items };
}

export function addItemAction(item: ItemModel): ItemsAction {
    return { type: ItemsActionType.AddItem, payload: item };
}

export function updateItemAction(item: ItemModel): ItemsAction {
    return { type: ItemsActionType.UpdateItem, payload: item };
}

export function getTotalItemsNumAction(itemsNumber: number): ItemsAction {
    return { type: ItemsActionType.GetTotalItemsNum, payload: itemsNumber };
}

export function itemsReducer(currentState = new ItemsState(), action: ItemsAction): ItemsState {

    const newState = { ...currentState };

    switch (action.type) {

        case ItemsActionType.GetAllItems:
            newState.items = action.payload;
            break;

        case ItemsActionType.GetTotalItemsNum:
            newState.itemsNumber = action.payload;
            break;

        case ItemsActionType.AddItem:
            newState.items.push(action.payload);
            break;

        case ItemsActionType.UpdateItem:
            const indexToUpdate = newState.items.findIndex(i => i._id === action.payload._id);
            if (indexToUpdate >= 0) {
                newState.items[indexToUpdate] = action.payload;
            }
            break;

    }

    return newState;

}