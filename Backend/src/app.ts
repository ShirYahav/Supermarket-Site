
import dotenv from "dotenv";
dotenv.config(); 

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import expressRateLimit from "express-rate-limit";
import fileUpload from "express-fileupload";
import config from "./01-utils/config";
import errorsHandler from "./02-middleware/errors-handler";
import preventGarbage from "./02-middleware/prevent-garbage";
import sanitize from "./02-middleware/sanitize";
import ErrorModel from "./03-models/error-model";
import dal from "./04-dal/dal";

dal.connect();

import itemsController from "./06-controllers/items-controller";
import categoriesController from "./06-controllers/categories-controller";
import authController from "./06-controllers/auth-controller";
import cartController from "./06-controllers/cart-controller";
import ordersController from "./06-controllers/order-controller";
import citiesController from "./06-controllers/cities-controller";

const server = express();

server.use("/", expressRateLimit({
    windowMs: 1000,
    max: 10000,
    message: "Are you a hacker?"
}));

if (config.isDevelopment) server.use(cors());
server.use(express.json());
server.use(preventGarbage);
server.use(fileUpload());
server.use(sanitize);

server.use("/api", authController);
server.use("/api", categoriesController);
server.use("/api", itemsController);
server.use("/api", cartController);
server.use("/api", ordersController);
server.use("/api", citiesController);

server.use("*", (request: Request, response: Response, next: NextFunction) => {
    next(new ErrorModel(404, "Route not found."));
});

server.use(errorsHandler);

server.listen(process.env.PORT, () => console.log("Listening..."));
