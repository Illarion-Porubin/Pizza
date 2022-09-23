const PizzaModel = require("../models/pizza-model");

class PizzaService {
  async getAllPizzas(page) {
    const perPage = 4;
    const pizzas = await PizzaModel.find()
      .skip(page * perPage)
      .limit(perPage);
    return pizzas;
  }

  // async create(page) {
  //     const perPage = 4;
  //     const pizzas = await PizzaModel.find().skip(page * perPage).limit(perPage);
  //     return pizzas;
  // }

  // async g(page) {
  //     const perPage = 4;
  //     const pizzas = await PizzaModel.find().skip(page * perPage).limit(perPage);
  //     return pizzas;
  // }

  // async g(page) {
  //     const perPage = 4;
  //     const pizzas = await PizzaModel.find().skip(page * perPage).limit(perPage);
  //     return pizzas;
  // }

  // async g(page) {
  //     const perPage = 4;
  //     const pizzas = await PizzaModel.find().skip(page * perPage).limit(perPage);
  //     return pizzas;
  // }

  // async g(page) {
  //     const perPage = 4;
  //     const pizzas = await PizzaModel.find().skip(page * perPage).limit(perPage);
  //     return pizzas;
  // }
}

module.exports = new PizzaService();
