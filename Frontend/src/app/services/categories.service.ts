import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  public async getAllCategories(): Promise<CategoryModel[]> {
    const categories = await firstValueFrom(this.http.get<CategoryModel[]>(environment.categoriesUrl));
    return categories;
  }

}
