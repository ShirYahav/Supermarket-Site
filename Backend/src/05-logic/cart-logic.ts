import { CartItemModel, ICartItemModel } from "../03-models/cart-item-model";
import ErrorModel from "../03-models/error-model";
import { IShoppingCartModel, ShoppingCartModel } from "../03-models/shopping-cart-model";

//Shopping Cart
async function addShoppingCart(shoppingCart: IShoppingCartModel): Promise<IShoppingCartModel> {
    const errors = shoppingCart.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);
    return shoppingCart.save();
}

async function getShoppingCartByCustomerId(customerId: string): Promise<IShoppingCartModel[]> {
    return ShoppingCartModel.find({ customerId }).populate("customer").exec();
}

//Cart Item
async function addCartItem(cartItem: ICartItemModel): Promise<ICartItemModel> {
    const errors = cartItem.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);
    return cartItem.save();
}

async function getOneCartItem(_id: string): Promise<ICartItemModel> {
    const cartItem = await CartItemModel.findById(_id).populate("item").populate("shoppingCart").exec();
    if (!cartItem) throw new ErrorModel(404, `_id ${_id} not found`);
    return cartItem;
}

async function getCartItemsByShoppingCart(shoppingCartId: string): Promise<ICartItemModel[]> {
    return CartItemModel.find({ shoppingCartId }).populate("shoppingCart").populate("item").exec();
}

async function deleteCartItem(_id: string): Promise<void> {
    const deletedCartItem = await CartItemModel.findByIdAndDelete(_id).exec();
    if (!deletedCartItem) throw new ErrorModel(404, `_id ${_id} not found`);
}

async function clearCart(shoppingCartId: string): Promise<void> {
    const clearedCart = await CartItemModel.deleteMany({shoppingCartId: shoppingCartId}).exec();
    if (!clearedCart) throw new ErrorModel(404, `_id ${shoppingCartId} not found`);
}

export default {
    addCartItem,
    getShoppingCartByCustomerId,
    addShoppingCart,
    getOneCartItem,
    getCartItemsByShoppingCart,
    deleteCartItem,
    clearCart
};