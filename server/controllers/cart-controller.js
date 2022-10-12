const cartService = require("../service/cart-service");

class CartController {
  async userCart(req, res, next) {
    try {
        const cart = await cartService.userCart(req.params.id);
        console.log(cart)
        res.json(cart) 
    } catch (e) {
      next(e);
    }
  }

  async order(req, res, next) {
    try {
      const userOrder = await cartService.newOrder(req.body.userId, req.body.newOrder)
      console.log(userOrder)
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CartController();
