// const mongoose = require("mongoose");
// const { type } = require("os");

// const productSchema = new mongoose.Schema({
//   id: { type: Number },
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   description: { type: String, required: true },
//   rating: { type: Number, required: true, min: 0, max: 5 },
//   category: { type: String, required: true },
//   supply: { type: Number, required: true },
//   stat: [
//     {
//       yearlySalesTotal: { type: Number, required: true },
//       yearlyTotalSoldUnits: { type: Number, required: true },
//     },
//   ],
// });

// const Product = mongoose.model("Product", productSchema);

// module.exports = Product;

const mongoose = require("mongoose");

const productStatSchema = new mongoose.Schema({
  yearlySalesTotal: { type: Number, required: true },
  yearlyTotalSoldUnits: { type: Number, required: true },
});

const productSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  category: { type: String, required: true },
  supply: { type: Number, required: true },
  stat: [productStatSchema], // Use productStatSchema for 'stat' array
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
