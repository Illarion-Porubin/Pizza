const e = require("express");
const CartSchema = require("../models/cart-model");

class CartService {
  // async userCart(user) {
  //   const cart = await CartSchema.find({ user: user });
  //   return cart;
  // }

  // async newOrder(userId, newOrder) {
  //   console.log(newOrder)
  //   const userOrder = newOrder.map((item ) => {
  //     return {...item, pizessPrice: item.count * item.price}
  //   })

  //   const newUserOrder = new CartSchema({
  //     totolCount: userOrder.reduce((sum, current) => sum += current.count, 0),
  //     totolPrice: userOrder.reduce((sum, current) => sum += current.count * current.price, 0),
  //     order: [...userOrder]
  //   });
  //   return await newUserOrder.save();
  // }
  async newOrder(userId, newOrder) {
    const newUserOrder = new CartSchema({
      phone: newOrder.number,
      totolCount: newOrder.cart.reduce((sum, current) => sum += current.pizzasCount, 0),
      totolPrice: newOrder.cart.reduce((sum, current) => sum += current.pizzasCount * current.price, 0),
      order: [...newOrder.cart]
    });
    console.log(newUserOrder)

    return await newUserOrder.save();
  }
}

module.exports = new CartService();
