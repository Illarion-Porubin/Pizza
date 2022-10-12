const { Schema, model, default: mongoose } = require("mongoose");

const CartSchema= new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    imageUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
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
    count: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Cart", CartSchema);
