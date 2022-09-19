const PizzaModel = require("../models/pizza-model");

class PizzaService {
    async getAllPizzas() {
        const pizzas = await PizzaModel.find()
        return pizzas;
        // try {
        //     if (!pizzas) {
        //       return res.status(400).json("ошибка получения данных");
        //     }
        //   } catch (error) {
        //     console.log(error);
        //     return res.status(500).json(`Не удалось получить данные из БД`);
        //   }
    }

    // async getAllUsers() {
    //     const users = await UserModel.find();
    //     return users;
    // }
}

module.exports = new PizzaService()