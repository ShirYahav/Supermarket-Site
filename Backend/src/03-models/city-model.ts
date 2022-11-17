import { Document, model, Schema } from "mongoose";

export interface ICityModel extends Document {
    cityName: string;
}

const CitySchema = new Schema<ICityModel>({
    cityName: {
        type: String,
        minlength: [4, "City too short"],
        maxlength: [20, "City too long"],
        trim: true,
        unique: true
    }
}, {
    versionKey: false
});

export const CityModel = model<ICityModel>("CityModel", CitySchema, "cities");
