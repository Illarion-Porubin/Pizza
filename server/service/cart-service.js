const CartSchema = require("../models/cart-model");

class CartService {
  async userCart(user) {
    const cart = await CartSchema.find({ user: user });
    return cart;
  }

  async newOrder(userId, newOrder) {
    // const userOrder = await CartSchema.find({ name: newOrder.name });
    // if(!userOrder.length){
    //   const newUserOrder = await CartSchema.create({
    //     user: userId,
    //     order: [
    //       {...newOrder}
    //     ]
    //   });
    //   const userCart = await newUserOrder.save();
    //   return userCart;
    // }
    // const userOrder = 
    const newUserOrder = await CartSchema.create({
      user: userId,
      totlCount: newOrder.reduce((sum, current) => sum + current.count, 0),
      totlPrice: newOrder.reduce((sum, current) => sum + (current.count * current.price), 0),
      order: [
        ...newOrder,
      ]
    });
    const userCart = await newUserOrder.save();
    return userCart;

    // const order = await CartSchema.updateOne({ name: newOrder.name }, { 'count': newOrder.count});
    // return order
  }
}

module.exports = new CartService();
