import { CategoryModel } from './category-model';
import { Document, model, Schema } from "mongoose";
import { UploadedFile } from 'express-fileupload';

export interface IItemModel extends Document {
    name: string;
    price: number;
    image: UploadedFile;
    imageName: string;
    categoryId: Schema.Types.ObjectId;
}

const ItemSchema = new Schema<IItemModel>({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [3, "Name too short"],
        maxlength: [50, "name too long"],
        match: [/.*\S.*/, "Invalid Name"],
        trim: true,
        unique: true,
    },
    price: {
        type: Number,
        required: [true, "Missing price"],
        min: [0, "Price can't be negative"],
        max: [1000, "Price can't exceed 1000"]
    },
    image: {
        type: Object, 
    },
    imageName:{
        type: String,
    },
    categoryId: {
        type: Schema.Types.ObjectId
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false 
});

ItemSchema.virtual("category", {
    ref: CategoryModel,
    localField: "categoryId",
    foreignField: "_id",
    justOne: true
});

export const ItemModel = model<IItemModel>("ItemModel", ItemSchema, "items");
