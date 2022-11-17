import { Document, model, Schema } from "mongoose";

export interface ICategoryModel extends Document {
    category: string;
}

const CategorySchema = new Schema<ICategoryModel>({
    category: {
        type: String,
        required: [true, "Missing Category"],
        minlength: [4, "Category too short"],
        maxlength: [20, "Category too long"],
        trim: true,
        unique: true
    }
}, {
    versionKey: false
});

export const CategoryModel = model<ICategoryModel>("CategoryModel", CategorySchema, "categories");
