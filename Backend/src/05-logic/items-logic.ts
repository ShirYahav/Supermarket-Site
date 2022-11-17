import ErrorModel from "../03-models/error-model";
import { IItemModel, ItemModel } from "../03-models/item-model";
import { v4 as uuid } from "uuid";
import path from "path";

async function getAllItems(): Promise<IItemModel[]> {
    return ItemModel.find().populate("category").exec();
}

async function getTotalItemsNum(): Promise<number> {
    return ItemModel.countDocuments().exec();
}

async function getOneItem(_id: string): Promise<IItemModel> {
    const item = await ItemModel.findById(_id).populate("category").exec();
    if (!item) throw new ErrorModel(404, `_id ${_id} not found`);
    return item;
}

async function getItemsByCategory(categoryId: string): Promise<IItemModel[]> {
    return ItemModel.find({ categoryId }).populate("category").exec();
}

async function addItem(item: IItemModel): Promise<IItemModel> {
    const errors = item.validateSync();

    if (item.image) {
        const extension = item.image.name.substring(item.image.name.lastIndexOf("."));
        item.imageName = uuid() + extension;
        await item.image.mv(path.join(__dirname, ".." , "assets", "images", "items", item.imageName));
        delete item.image;
    }
    
    if (errors) throw new ErrorModel(400, errors.message);
    return item.save();
}

async function updateItem(item: IItemModel): Promise<IItemModel> {
    const errors = item.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);

    if (item.image) {
        const extension = item.image.name.substring(item.image.name.lastIndexOf("."));
        item.imageName = uuid() + extension;
        await item.image.mv(path.join(__dirname, ".." , "assets", "images", "items", item.imageName));
        delete item.image;
    }

    const updatedItem = await ItemModel.findByIdAndUpdate(item._id, item, { returnOriginal: false }).exec(); 
    if (!updateItem) throw new ErrorModel(404, `_id ${item._id} not found`);

    return updatedItem;
}

export default {
    getAllItems,
    getTotalItemsNum,
    getOneItem,
    getItemsByCategory,
    addItem,
    updateItem
};

