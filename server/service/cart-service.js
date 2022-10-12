const CartSchema = require("../models/cart-model");

class CartService {
  async userCart(user) {
    const cart = await CartSchema.find({ user: user });
    return cart;
  }

  async newOrder(userId, newOrder) {
    const userOrder = await CartSchema.find({ name: newOrder.name });
    if (userOrder) {
        const order = await CartSchema.updateOne({ name: newOrder.name }, { 'count': newOrder.count});
        return order
    }

    const newUserOrder = new CartSchema({
      ...newOrder,
      user: userId,
    });

    const userCart = await newUserOrder.save();
    return userCart;
  }
}

module.exports = new CartService();
