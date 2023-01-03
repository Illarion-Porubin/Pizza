const CartSchema = require("../models/cart-model");

class CartService {
  async newOrder(userId, newOrder) {
    const newUserOrder = new CartSchema({
      phone: newOrder.number,
      totolCount: newOrder.items.reduce((sum, current) => sum += current.pizzasCount, 0),
      totolPrice: newOrder.items.reduce((sum, current) => sum += current.pizzasCount * current.price, 0),
      order: [...newOrder.items]
    });
    console.log(newUserOrder, '<<<<<<<<<<<<<<<<<<')
    return await newUserOrder.save();
  }
}

module.exports = new CartService();
