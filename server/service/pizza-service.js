const PizzaSchema = require("../models/pizza-model");

class PizzaService {
  async getAllPizzas(page) {
    const perPage = 4;
    const pizzas = await PizzaSchema.find()
      .skip(page * perPage)
      .limit(perPage);
    return pizzas;
  }
}

module.exports = new PizzaService();
