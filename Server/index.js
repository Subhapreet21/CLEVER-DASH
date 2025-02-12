const express = require("express");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
path = require("path"); //Added Code
const cors = require("cors");
const {
  Calendar,
  Contact,
  Invoice,
  Product,
  Team,
} = require("./models/model.js");
// Configuration

const app = express();
app.use(bodyParser.json());

// Mongoose Setup
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Your development origin
      ,
    ],
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE"], // Methods you want to allow
    allowedHeaders: ["Content-Type", "Authorization"], // Headers to allow
    credentials: true, // If you want to allow cookies/credentials
  })
);
const URI =
  "mongodb+srv://subhapreetpatro2004:Patro202172112@cluster0.bjkxtm6.mongodb.net/Clever-dash?retryWrites=true&w=majority&appName=Cluster0";
const PORT = 9000; //process.env.PORT ||
mongoose
  .connect(URI, {})
  .then(() => {
    console.log("MongoDB successfully connected");
  })
  .catch((error) => console.log(`${error} did not connect.`));

app.post("/addMember", async (req, res) => {
  const { name, email, age, phone, accessLevel } = req.body;

  if (!name || !email || !age || !phone || !accessLevel) {
    return res
      .status(422)
      .json({ error: "Please fill all the fields properly!!!" });
  }

  try {
    // Check if employee with the given empid already exists
    // Create a new employee document
    const newMember = new Team({
      name,
      email,
      age,
      phone,
      accessLevel,
    });

    // Save the new employee document to the database
    await newMember.save();
    console.log("New Member Registered Successfully...");
    // Send success response
    return res.status(201).json({ message: "Member registered successfully." });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/addContact", async (req, res) => {
  const { registrarId, name, email, age, phone, address, city, zipCode } =
    req.body;

  if (
    !registrarId ||
    !name ||
    !email ||
    !age ||
    !phone ||
    !address ||
    !city ||
    !zipCode
  ) {
    return res
      .status(422)
      .json({ error: "Please fill all the fields properly!!!" });
  }

  try {
    // Check if employee with the given empid already exists
    // Create a new employee document
    const newContact = new Contact({
      registrarId,
      name,
      email,
      age,
      phone,
      address,
      city,
      zipCode,
    });

    // Save the new employee document to the database
    await newContact.save();
    console.log("New Contact Registered Successfully...");
    // Send success response
    return res.status(201).json({ message: "Member registered successfully." });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/addInvoice", async (req, res) => {
  const { name, email, cost, phone, dueDate } = req.body;

  if (!name || !email || !cost || !phone || !dueDate) {
    return res
      .status(422)
      .json({ error: "Please fill all the fields properly!!!" });
  }

  try {
    // Check if employee with the given empid already exists
    // Create a new employee document
    const newInvoice = new Invoice({
      name,
      email,
      cost,
      phone,
      dueDate,
    });

    // Save the new employee document to the database
    await newInvoice.save();
    console.log("New Invoice Registered Successfully...");
    // Send success response
    return res
      .status(201)
      .json({ message: "Invoice registered successfully." });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/addProduct", async (req, res) => {
  const { name, price, description, rating, category, supply, stat } = req.body;

  if (
    !name ||
    !price ||
    !description ||
    !rating ||
    !category ||
    !supply ||
    !stat
  ) {
    return res
      .status(422)
      .json({ error: "Please fill all the fields properly!!!" });
  }

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      rating,
      category,
      supply,
      stat,
    });

    await newProduct.save();
    console.log("New Product Registered Successfully...");
    return res
      .status(201)
      .json({ message: "Product registered successfully." });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/addEvent", async (req, res) => {
  const { title, date } = req.body;
  try {
    const newEvent = new Calendar({ title, date }); // Instantiate a new Calendar event
    await newEvent.save(); // Save the new event to the database
    res.status(201).json(newEvent); // Return the newly created event as JSON response
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ error: "Failed to add event" }); // Handle error if saving fails
  }
});

//implementing get route to get employees data
app.get("/getMembers", async (req, res) => {
  try {
    const allemployees = await Team.find();
    return res.status(200).json(allemployees);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getContacts", async (req, res) => {
  try {
    const allContacts = await Contact.find();
    return res.status(200).json(allContacts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getInvoices", async (req, res) => {
  try {
    const allInvoices = await Invoice.find();
    return res.status(200).json(allInvoices);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getProducts", async (req, res) => {
  try {
    const allProducts = await Product.find();
    return res.status(200).json(allProducts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getEvents", async (req, res) => {
  try {
    const allEvents = await Calendar.find();
    return res.status(200).json(allEvents);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// //specific id based search to get specific employee data
app.get("/getMember/:id", async (req, res) => {
  try {
    const memberId = req.params.id;
    const memberData = await Team.findOne({ _id: memberId });

    if (!memberData) {
      return res.status(404).json({ error: "Member not found" });
    }

    return res.status(200).json(memberData);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getContact/:id", async (req, res) => {
  try {
    const contactId = req.params.id;
    const contactData = await Contact.findOne({ _id: contactId });

    if (!contactData) {
      return res.status(404).json({ error: "Contact not found" });
    }

    return res.status(200).json(contactData);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getInvoice/:id", async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const invoiceData = await Invoice.findOne({ _id: invoiceId });

    if (!invoiceData) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    return res.status(200).json(invoiceData);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getProduct/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = await Product.findOne({ _id: productId });

    if (!productData) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(productData);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getEvent/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Calendar.findOne({ _id: eventId });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    return res.status(200).json(event);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// // Update Employee Details based on specific ID
app.put("/updateMember/:id", async (req, res) => {
  try {
    // Find the member by its ID and update it
    let member = await Team.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });

    // If member not found, return 404
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    // Return success response with the updated member
    return res.json({ message: "Member updated successfully", member });
  } catch (error) {
    // Log and return internal server error
    console.error("Error updating member:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/updateContact/:id", async (req, res) => {
  try {
    // Find the member by its ID and update it
    let contact = await Contact.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );

    // If member not found, return 404
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    // Return success response with the updated member
    return res.json({ message: "Contact updated successfully", contact });
  } catch (error) {
    // Log and return internal server error
    console.error("Error updating contact:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/updateInvoice/:id", async (req, res) => {
  try {
    // Find the member by its ID and update it
    let invoice = await Invoice.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );

    // If member not found, return 404
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    // Return success response with the updated member
    return res.json({ message: "Invoice updated successfully", invoice });
  } catch (error) {
    // Log and return internal server error
    console.error("Error updating invoice:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/updateProduct/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      updatedData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/updateEvent/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedData = req.body;

    const updatedEvent = await Calendar.findOneAndUpdate(
      { _id: eventId },
      updatedData,
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    return res
      .status(200)
      .json({ message: "Event updated successfully", updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE endpoint to delete a single document by ID
// If empid is your unique identifier, query by it
app.delete("/deleteMember/:id", async (req, res) => {
  const Memberid = req.params.id;
  console.log("Deleting employee with empid:", Memberid);

  try {
    const deleteMember = await Team.deleteOne({ _id: Memberid });
    if (deleteMember.deletedCount === 0) {
      console.log("Employee not found with empid:", Memberid);
      return res.status(404).json({ error: "Employee not found" });
    }
    console.log("Employee deleted successfully");
    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/deleteContact/:id", async (req, res) => {
  const contactId = req.params.id;
  console.log("Deleting contact with id:", contactId);

  try {
    const deleteContact = await Contact.deleteOne({ _id: contactId });
    if (deleteContact.deletedCount === 0) {
      console.log("Contact not found with empid:", contactId);
      return res.status(404).json({ error: "Contact not found" });
    }
    console.log("Contact deleted successfully");
    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/deleteInvoice/:id", async (req, res) => {
  const invoiceId = req.params.id;
  console.log("Deleting invoice with id:", invoiceId);

  try {
    const deleteInvoice = await Invoice.deleteOne({ _id: invoiceId });
    if (deleteInvoice.deletedCount === 0) {
      console.log("Invoice not found with id:", invoiceId);
      return res.status(404).json({ error: "Invoice not found" });
    }
    console.log("Invoice deleted successfully");
    return res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    console.error("Error deleting invoice:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const deleteProduct = await Product.deleteOne({ _id: productId });

    if (deleteProduct.deletedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/deleteEvent/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const deleteEvent = await Calendar.deleteOne({ _id: eventId });

    if (deleteEvent.deletedCount === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, (error) => {
  if (error) {
    console.log("Failed to connect server");
  } else {
    console.log(`Server started and Server running on ${PORT}`);
  }
});
