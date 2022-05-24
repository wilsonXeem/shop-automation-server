const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const productsRoutes = require("./api/routes/products");
const purchaseRoutes = require("./api/routes/purchases");
const dailySalesRoutes = require("./api/routes/dailySales");
const expenseRoutes = require("./api/routes/expenses");

mongoose.connect(
  "mongodb+srv://anonymous:anonymous@cluster0.3hdvk.mongodb.net/?retryWrites=true&w=majority"
);

const app = express();

app.use(morgan("dev"));

// Use body parser to parse body of incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, DELETE, GET"
    );
    return res.status(200).json({});
  }
  next();
});

app.use("/products", productsRoutes);
app.use("/purchases", purchaseRoutes);
app.use("/sales", dailySalesRoutes);
app.use("/expenses", expenseRoutes);

// Error handling
app.use((req, res, next) => {
  const error = new Error();
  error.message = "Not Found";
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ error: error.message });
});

const port = process.env.PORT || 6000;
app.listen(port, () => console.log("working"));
