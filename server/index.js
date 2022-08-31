import express from "express";
import mongoose from "mongoose";
import PizzaModel from "./models/PizzaModel.js";
import UserModel from "./models/UserModel.js";
import bcrypt from "bcrypt";
import cors from "cors"
import {
  pizzaValidation,
  registValidation,
  loginValidation,
} from "./validations/validations.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

mongoose
  .connect(
    `mongodb+srv://Admin:Admin123@cluster0.j0w4mvi.mongodb.net/PizzaBD?retryWrites=true&w=majority`
  )
  .then(() => console.log(`DB ok`))
  .catch((err) => console.log(`DB error`, err));

const app = express();
app.use(express.json());
app.use(cors())
app.listen(4400, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Port start`);
});




app.post("/pizza", pizzaValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
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
});



app.get("/pizzas", async (req, res) => {
    try {
        const pizzas = await PizzaModel.find()
        if(!pizzas){
            return res.status(400).json('ошибка получения данных')
        }
        res.json(pizzas)
    } catch (error) {
        console.log(error);
        return res.status(500).json(`Не удалось получить данные из БД`);
    }
})


app.post("/auth/register", registValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json(errors.array());
    }
    const pass = req.body.password;
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(pass, salt);

    const doc = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });

    const user = await doc.save();

    const { password, ...userData } = user._doc;

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
    res.json({
      token,
      ...userData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: `Ошибка регистрации`,
    });
  }
});

app.post("/auth/login", loginValidation, async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).res.json(`Пользователь не существует`);
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.password
    ); // сравниваем пароли

    if (!isValidPass) {
      return res.status(400).json({
        message: `Неверный логин или пароль`,
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
    const { password, ...userData } = user._doc;

    return res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(`не удалось авторизироваться`);
  }
});
