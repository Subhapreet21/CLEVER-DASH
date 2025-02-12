// const mongoose = require("mongoose");
// const { type } = require("os");

// const contactSchema = new mongoose.Schema({
//   id: { type: Number, required: true },
//   registrarid: { type: String, required: true },
//   name: { type: String, required: true },
//   age: { type: Number, required: true },
//   phone: { type: String, required: true },
//   email: { type: String, required: true },
//   address: { type: String, required: true },
//   city: { type: String, required: true },
//   zipcode: { type: String, required: true },
// });

// const Contact = mongoose.model("Contact", contactSchema);

// module.exports = Contact;
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  registrarId: { type: Number, required: true }, // Corrected field name
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
