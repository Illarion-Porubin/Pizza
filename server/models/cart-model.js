const { Schema, model, default: mongoose } = require("mongoose");

const CartSchema= new Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: false,
    // },
    totlCount: {
      type: String,
      required: true,
      unique: false
    },
    totlPrice: {
      type: String,
      required: true,
      unique: false
    },
    order: [
      {
        // imageUrl: {
        //   type: String,
        //   required: true,
        //   unique: false
        // },
        name: {
          type: String,
          required: true,
          unique: false
        },
        types: {
          type: [String],
          required: true,
          unique: false
        },
        sizes: {
          type: [String],
          required: true,
          unique: false
        },
        price: {
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
  {
    timestamps: true,
  }
);

module.exports = model("Cart", CartSchema);



// order: [
//   pizza = {
    // imageUrl: {
    //   type: String,
    //   required: true,
    // },
    // name: {
    //   type: String,
    //   required: true,
    // },
    // types: {
    //   type: [String],
    //   required: true,
    // },
    // sizes: {
    //   type: [String],
    //   required: true,
    // },
    // price: {
    //   type: String,
    //   required: true,
    // },
    // category: {
    //   type: String,
    //   required: true,
    // },
    // rating: {
    //   type: String,
    //   required: true,
    // },
    // new: {
    //   type: Boolean,
    //   required: true,
    // },
    // popular: {
    //   type: Boolean,
    //   required: true,
    // },
    // count: {
    //   type: String,
    //   required: true
    // }
//   }
// ], 