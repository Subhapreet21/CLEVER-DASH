// const mongoose = require("mongoose");

// const invoiceSchema = new mongoose.Schema({
//   id: { type: Number, required: true },
//   name: { type: String, required: true },
//   phone: { type: String, required: true },
//   email: { type: String, required: true },
//   cost: { type: String, required: true },
//   dueDate: { type: Date, required: true },
//   // status: { type: String, enum: ["Paid", "Unpaid"], default: "Unpaid" },
// });

// const Invoice = mongoose.model("Invoice", invoiceSchema);

// module.exports = Invoice;

const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  cost: { type: String, required: true },
  phone: { type: String, required: true },
  dueDate: { type: Date, required: true }, // Added dueDate field
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
