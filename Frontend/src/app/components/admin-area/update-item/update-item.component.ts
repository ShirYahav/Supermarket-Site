import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { ItemModel } from 'src/app/models/item.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ItemsService } from 'src/app/services/items.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  public categories: CategoryModel[];

  public item: ItemModel;
  public itemForm: FormGroup;
  public nameInput: FormControl;
  public priceInput: FormControl;
  public categorySelect: FormControl;
  public imageInput: FormControl;

  @ViewChild("imageBox")
  public imageBoxRef: ElementRef<HTMLInputElement>;

  constructor(        
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private itemsService: ItemsService,
    private categoriesService: CategoriesService,
    private notifyService: NotifyService) {}

  async ngOnInit() {
    try {
      this.categories = await this.categoriesService.getAllCategories();

      const _id = this.activatedRoute.snapshot.params["_id"];
      this.item = await this.itemsService.getOneItem(_id);

      this.nameInput = new FormControl(this.item.name, [Validators.required, Validators.minLength(3)]);
      this.priceInput = new FormControl(this.item.price, [Validators.required, Validators.min(0)]);
      this.categorySelect = new FormControl(this.item.category.category, [Validators.required]);
      this.imageInput = new FormControl();
      this.itemForm = new FormGroup({
          nameBox: this.nameInput,
          priceBox: this.priceInput,
          categoryBox: this.categorySelect,
          imageBox: this.imageInput
      });
  }
  catch (err: any) {
      this.notifyService.error(err);
  }
  }

  public async update() {
    try {
        this.item.name = this.nameInput.value;
        this.item.price = this.priceInput.value;
        this.item.category = this.categorySelect.value;
        this.item.image = this.imageBoxRef.nativeElement.files[0];
        await this.itemsService.updateItem(this.item);
        this.notifyService.success("Item has been updated");
        this.router.navigateByUrl("/item-list-admin");
    }
    catch (err: any) {
        this.notifyService.error(err);
    }
  }



}
