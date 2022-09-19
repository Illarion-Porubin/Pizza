// const PizzaService = require("../service/pizza-service");
// const { validationResult } = require("express-validator");
// const ApiError = require("../exceptions/api-error");
const PizzaModel = require("../models/pizza-model");
const pizzaService = require("../service/pizza-service");

class PizzaController {
  async getPizzas(req, res, next) {
    try {
      const page = req.query.p || 0;
      const perPage = 4;
      const pizzas = await PizzaModel.find()
        .skip(page * perPage)
        .limit(perPage);
      if (!pizzas) {
        return res.status(400).json("ошибка получения данных");
      }
      const data = await PizzaModel.find();
      const pages = Math.ceil(data.length / 4);
      res.json({
        pages,
        pizzas,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(`Не удалось получить данные из БД`);
    }
  }
}

module.exports = new PizzaController();
