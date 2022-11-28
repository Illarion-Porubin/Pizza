const { Schema, model } = require("mongoose");

const CartSchema = new Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   unique: false,
    //   required: false,
    // },
    phone: {
      type: String,
      required: true,
      unique: false
    },
    totolCount: {
      type: String,
      required: true,
      unique: false
    },
    totolPrice: {
      type: String,
      required: true,
      unique: false
    },
    order: [
      {
        name: {
          type: String,
          required: true,
          unique: false
        },
        types: {
          type: String,
          required: true,
          unique: false
        },
        sizes: {
          type: String,
          required: true,
          unique: false
        },
        price: {
          type: String,
          required: true,
          unique: false
        },
        pizzasCount: {
          type: String,
          required: true,
          unique: false
        },
        pizzasPrice: {
          type: String,
          required: true,
          unique: false
        },
     }
  ]
  },
);

module.exports = model("Cart", CartSchema);