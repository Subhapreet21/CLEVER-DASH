const mongoose = require("mongoose");
const barSchema = new mongoose.Schema({
  country: { type: String, required: true },
  Category_A: { type: Number, required: true },
  Category_B: { type: Number, required: true },
  Category_C: { type: Number, required: true },
  Category_D: { type: Number, required: true },
  Category_E: { type: Number, required: true },
  Category_F: { type: Number, required: true },
});

const Bar = mongoose.model("Bar", barSchema);

const calendarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  }, // Change type to Date to match mock data
});

const Calendar = mongoose.model("Calendar", calendarSchema);

const contactSchema = new mongoose.Schema({
  registrarId: { type: Number, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
});

const Contact = mongoose.model("Contact", contactSchema);

const geographySchema = new mongoose.Schema({
  id: { type: String, required: true },
  value: { type: Number, required: true },
});

const Geography = mongoose.model("Geography", geographySchema);

const invoiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cost: { type: Number, required: true },
  phone: { type: String, required: true },
  dueDate: { type: Date, required: true }, // Added dueDate field
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

const lineDataSchema = new mongoose.Schema({
  x: { type: String, required: true }, // Change field name to 'x' to match data
  y: { type: Number, required: true },
});

const lineSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Change type to String
  color: { type: String, required: true },
  data: [lineDataSchema], // Nest lineDataSchema for 'data' field
});

const Line = mongoose.model("Line", lineSchema);
const pieSchema = new mongoose.Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
  value: { type: Number, required: true },
  color: { type: String, required: true },
});

const Pie = mongoose.model("Pie", pieSchema);

const productStatSchema = new mongoose.Schema({
  yearlySalesTotal: { type: Number, required: true },
  yearlyTotalSoldUnits: { type: Number, required: true },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  category: {
    type: String,
    enum: [
      "Category_A",
      "Category_B",
      "Category_C",
      "Category_D",
      "Category_E",
      "Category_F",
    ],
    default: "Category_A",
    required: true,
  },
  supply: { type: Number, required: true },
  stat: [productStatSchema], // Use productStatSchema for 'stat' array
});

const Product = mongoose.model("Product", productSchema);

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  phone: { type: String },
  email: { type: String },
  accessLevel: {
    type: String,
    enum: ["Admin", "User", "Manager"],
    default: "User",
  },
});

const Team = mongoose.model("Team", teamSchema);
module.exports = {
  Bar,
  Calendar,
  Contact,
  Geography,
  Invoice,
  Line,
  Pie,
  Product,
  Team,
};
