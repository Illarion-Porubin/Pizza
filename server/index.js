require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 4400;
const app = express()

app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//     credentials: true,
//     origin: process.env.CLIENT_URL
// }));
app.use(cors());
app.use('/api', router);
app.use(errorMiddleware);
app.listen(4400, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log(`Port start ${PORT}`);
  });

const start = async () => {
    try {
        mongoose
        .connect(process.env.DB_URL)
        .then(() => console.log(`DB ok`))
        .catch((err) => console.log(`DB error`, err));
    } catch (e) {
        console.log(e);
    }
}

start()
