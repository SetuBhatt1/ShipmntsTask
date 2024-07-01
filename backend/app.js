// imports from .env file
require("dotenv").config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// imports
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// importing routes
const companyRoute = require("./src/routes/companyRoutes");
const contactRoute = require("./src/routes/contactRoutes");

const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/api/company", companyRoute);
app.use("/api/contact", contactRoute);

// test route
app.get("/api/test", (req, res) => {
  res.json({ test: "success" });
});

// if "connected to DB" then "server is listening"
mongoose.connect(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Connected to DB and server is running on ${PORT}`);
  });
});
