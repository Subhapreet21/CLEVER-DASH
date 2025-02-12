var express = require("express");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

// Import routes
const teamRoutes = require("./routes/teamRoutes");
const contactsRoutes = require("./routes/contactRoutes.js");
const invoicesRoutes = require("./routes/invoiceRoutes.js");
const productsRoutes = require("./routes/productRoutes.js");
const calendarRoutes = require("./routes/calendarRoutes.js");
const barChartRoutes = require("./routes/barRoutes.js");
const pieChartRoutes = require("./routes/pieRoutes.js");
const lineChartRoutes = require("./routes/lineRoutes.js");
const geographyChartRoutes = require("./routes/geographyRoutes.js");

// Data imports
const Team = require("./models/teamModel.js");
const Contact = require("./models/contactModel.js");
const Invoice = require("./models/invoiceModel.js");
const Product = require("./models/productModel.js");
const Calendar = require("./models/calendarModel.js");
const Bar = require("./models/barModel.js");
const Pie = require("./models/pieModel.js");
const Line = require("./models/lineModel.js");
const Geography = require("./models/geographyModel.js");
// const {
//   mockDataTeam,
//   mockDataContacts,
//   mockDataInvoices,
//   mockBarData,
//   mockPieData,
//   mockLineData,
//   mockProductData,
//   mockGeographyData,
//   mockCalendarData,
// } = require("../Client/src/data/mockData.js");

// Configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes Setup
app.use("/team", teamRoutes);
app.use("/contacts", contactsRoutes);
app.use("/invoices", invoicesRoutes);
app.use("/products", productsRoutes);
app.use("/calendar", calendarRoutes);
app.use("/barChart", barChartRoutes);
app.use("/pieChart", pieChartRoutes);
app.use("/lineChart", lineChartRoutes);
app.use("/geographyChart", geographyChartRoutes);

// Mongoose Setup
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    // Only run first time when running app to insert data into mongodb
    // Team.insertMany(mockDataTeam);
    // Contact.insertMany(mockDataContacts);
    // Invoice.insertMany(mockDataInvoices);
    // Bar.insertMany(mockBarData);
    // Pie.insertMany(mockPieData);
    // Line.insertMany(mockLineData);
    // Product.insertMany(mockProductData);
    // Geography.insertMany(mockGeographyData);
    // Calendar.insertMany(mockCalendarData);
  })
  .catch((error) => console.log(`${error} did not connect.`));
