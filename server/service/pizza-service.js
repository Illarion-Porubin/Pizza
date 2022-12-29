const PizzaSchema = require("../models/pizza-model");

class PizzaService {
  async getAllPizzas(page) {
    const products = 4;
    const pizzas = await PizzaSchema.find()
      .skip(page * products)
      .limit(products);
    return pizzas;
  }
}

module.exports = new PizzaService();
