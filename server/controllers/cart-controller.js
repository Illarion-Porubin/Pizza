const cartService = require("../service/cart-service");

class CartController {
  // async userCart(req, res, next) {
  //   try {
  //       const cart = await cartService.userCart(req.params.id);
  //       return res.json(cart) 
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  async order(req, res, next) {
    console.log(req.body)
    try {
      const userOrder = await cartService.newOrder(req.body.userId, req.body)
      return res.json(userOrder)
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CartController();
