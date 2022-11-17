import ErrorModel from "../03-models/error-model";
import { IOrderModel, OrderModel } from "../03-models/order-model";

async function addOrder(order: IOrderModel): Promise<IOrderModel> {
    const errors = order.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);
    return order.save();
}

async function getTotalOrdersNum(): Promise<number> {
    return OrderModel.countDocuments().exec();
}

export default {
    addOrder,
    getTotalOrdersNum
};