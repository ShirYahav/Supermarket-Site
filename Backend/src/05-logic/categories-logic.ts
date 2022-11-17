import { CategoryModel, ICategoryModel } from "../03-models/category-model";

async function getAllCategories(): Promise<ICategoryModel[]> {
    return CategoryModel.find().exec();
}

export default {
    getAllCategories
};