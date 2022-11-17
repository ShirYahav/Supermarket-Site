import { CategoryModel } from "./category.model";

export class ItemModel {
    public _id: string;
    public name: string;
    public price: number;
    public image: File;
    public imageName: string;
    public categoryId: string;
    public category: CategoryModel;
}