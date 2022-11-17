import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemModel } from '../models/item.model';
import { addItemAction, getAllItemsAction, getTotalItemsNumAction, ItemsAction, updateItemAction } from '../redux/items-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }
  
  public async getAllItems(): Promise<ItemModel[]> {
    let items = store.getState().itemsState.items;
    if (items.length === 0) {
      items = await firstValueFrom(this.http.get<ItemModel[]>(environment.itemsUrl));
      const action: ItemsAction = getAllItemsAction(items);
      store.dispatch(action);
    }
    return items;
  }

  public async getOneItem(_id: string): Promise<ItemModel> {
    let items = await this.getAllItems();
    const item = items.find(i => i._id === _id);
    return item;
  }

  public async getItemsByCategory(categoryId: string): Promise<ItemModel[]> {
    let items = await this.getAllItems();
    const itemsByCategory = items.filter(i => i.categoryId === categoryId);
    return itemsByCategory;
  }

  public async getTotalItemsNum(): Promise<number> {
    let itemsNumber = store.getState().itemsState.itemsNumber;
    if(!itemsNumber) {
      itemsNumber = await firstValueFrom(this.http.get<number>(environment.itemsNumberUrl));
      const action: ItemsAction = getTotalItemsNumAction(itemsNumber);
      store.dispatch(action)
    }
    return itemsNumber;
  }

  public async addItem(item: ItemModel): Promise<ItemModel> {

    const formData = new FormData();
    formData.append("name", item.name);
    formData.append("price", item.price?.toString());
    formData.append("image", item.image);
    formData.append("categoryId", item.categoryId);

    const addedItem = await firstValueFrom(this.http.post<ItemModel>(environment.itemsUrl, formData));

    store.dispatch(addItemAction(addedItem));

    return addedItem;
  }

  public async updateItem(item: ItemModel): Promise<ItemModel> {

    const formData = new FormData();
    formData.append("_id", item._id.toString());
    formData.append("name", item.name);
    formData.append("price", item.price?.toString());
    formData.append("image", item.image);
    formData.append("categoryId", item.categoryId);

    const updatedItem = await firstValueFrom(this.http.put<ItemModel>(environment.itemsUrl + item._id, formData));

    store.dispatch(updateItemAction(updatedItem));

    return updatedItem;
  }

}
