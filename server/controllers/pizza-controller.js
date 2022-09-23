// const PizzaService = require("../service/pizza-service");
// const ApiError = require("../exceptions/api-error");
const { validationResult } = require("express-validator");
const PizzaModel = require("../models/pizza-model");
const pizzaService = require("../service/pizza-service");
const validations = require ("../validations/validations");


class PizzaController {
  //////////////////////Pizzas////////////////////////////////
  async getPizzas(req, res, next) {
    try {
      const page = req.query.p || 0;
      const pizzas = await pizzaService.getAllPizzas(page)
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


  async createPizza(req, res, ) {
    try {
      const errors = validationResult(req);
      console.log(req)
      if (!errors.isEmpty()) {
        res.status(400).json(errors.array());
      }
  
      const doc = new PizzaModel({
        imageUrl: req.body.imageUrl,
        name: req.body.name,
        types: req.body.types,
        sizes: req.body.sizes,
        price: req.body.price,
        category: req.body.category,
        rating: req.body.rating,
        new: req.body.new,
        popular: req.body.popular,
      });
  
      const pizza = await doc.save();
  
      res.json(pizza);
    } catch (error) {
      console.log(error);
      return res.status(500).json(`Не удалось создать пиццу`);
    }
  }

  async categoryPizzas(req, res, next) {
    try {
      const category = req.params.id;
      const pizzas = await PizzaModel.find({ category });
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
  //////////////////sort-search//////////////////////////////

  async sort(req, res) {
    try {
      const sort = req.params.value.slice(-4) === `less` ? -1 : 1;
      const filt = req.params.value.replace(req.params.value.slice(-4), "");
      const value = { [filt]: sort };
      const pizzas = await PizzaModel.find().sort(value);
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

  async search(req, res) {
    try {
      const value = req.params.value;
      const pizzas = await PizzaModel.find({
        name: { $regex: value, $options: "i" },
      });
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
