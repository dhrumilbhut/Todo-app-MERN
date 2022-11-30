// Configuring dotenv
require("dotenv").config();

// Imported todoRoutes
const todoRouter = require("./routes/todoRoutes");

//Database connection
const { db } = require("./config/db");
db();

// Importing express
const express = require("express");
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", todoRouter);

// Export
module.exports = app;
