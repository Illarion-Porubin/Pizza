const cartService = require("../service/cart-service");

class CartController {

  async order(req, res, next) {
    try {
      const userOrder = await cartService.newOrder(req.body.userId, req.body)
      return res.json(userOrder)
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CartController();
