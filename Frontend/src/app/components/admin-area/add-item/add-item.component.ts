import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { CategoryModel } from 'src/app/models/category.model';
import { ItemModel } from 'src/app/models/item.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ItemsService } from 'src/app/services/items.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  public item = new ItemModel();
  public categories: CategoryModel[];

  @ViewChild("imageBox")
  public imageBoxRef: ElementRef<HTMLInputElement>;
  
  constructor(private categoriesService: CategoriesService,
    private itemsService: ItemsService,
    private notifyService: NotifyService) { }

  async ngOnInit(): Promise<void> {
    try{ 
      this.categories = await this.categoriesService.getAllCategories();
    }
    catch(err: any) {
      this.notifyService.error(err);
    }
  }

  async add(addItemForm: NgForm) {
    try {
      this.item.image = this.imageBoxRef.nativeElement.files[0];
      await this.itemsService.addItem(this.item);
      this.notifyService.success("Item has been successfully added");
      addItemForm.reset();
    }
    catch(err:any) {
      this.notifyService.error(err+"111");
    }
  }

}
