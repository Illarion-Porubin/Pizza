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
      type: [Number],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
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
