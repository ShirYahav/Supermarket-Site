import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { ItemModel } from 'src/app/models/item.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ItemsService } from 'src/app/services/items.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  public searchTerm: string = '';
  public term: string = '';
  public items: ItemModel[];
  public categories: CategoryModel[];

  constructor(
    private itemsService: ItemsService,
    private categoriesService: CategoriesService,
    private notifyService: NotifyService) { }

  async ngOnInit() {
    try{ 
      this.items = await this.itemsService.getAllItems();
      this.categories = await this.categoriesService.getAllCategories();
    }
    catch(err: any) {
      this.notifyService.error(err);
    }
  }
  
  async getItemsByCategory(args: Event) {
    try{
      const selectElement = (args.target as HTMLSelectElement);
      const categoryId = selectElement.value;
      if (categoryId === '6299ef9744b3c092015cd6ee') {
        this.items = await this.itemsService.getAllItems();
      } 
      else {
        this.items = await this.itemsService.getItemsByCategory(categoryId);
      }
    }
    catch(err: any){
      this.notifyService.error(err);
    }
  }


}
