const { Schema, model } = require("mongoose");

const PizzaSchema= new Schema(
  {
    imageUrl: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    types: {
      type: [String],
      required: true,
    },
    sizes: {
      type: [String],
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    new: {
      type: Boolean,
      required: true,
    },
    popular: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Pizza", PizzaSchema);
