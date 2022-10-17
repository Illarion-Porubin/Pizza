const { Schema, model } = require("mongoose");

const CartSchema = new Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   unique: false,
    //   required: false,
    // },
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
        pizessPrice: {
          type: String,
          required: true,
          unique: false
        },
        count: {
          type: String,
          required: true,
          unique: false
        },
     }
  ]
  },
);

module.exports = model("Cart", CartSchema);