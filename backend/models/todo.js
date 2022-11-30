// Import Mongoose
const mongoose = require("mongoose");

// Defining a Schema
const TodoSchema = new mongoose.Schema({
  title: String,
  tasks: [String],
});

// Making and exporting a model
const TodoModel = mongoose.model("Todo", TodoSchema);
module.exports = TodoModel;
