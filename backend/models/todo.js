<<<<<<< HEAD
// Import Mongoose
const mongoose = require("mongoose");

// Defining a Schema
const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Todo title is required"],
      maxLength: [30, "Maximum length of title is 30 characters"],
    },
    tasks: {
      type: [
        {
          type: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Making and exporting a model
const TodoModel = mongoose.model("Todo", TodoSchema);
module.exports = TodoModel;
=======
// Import Mongoose
const mongoose = require("mongoose");

// Defining a Schema
const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Todo title is required"],
      maxLength: [30, "Maximum length of title is 30 characters"],
    },
    tasks: {
      type: [
        {
          type: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Making and exporting a model
const TodoModel = mongoose.model("Todo", TodoSchema);
module.exports = TodoModel;
>>>>>>> e6921fed1859bfe53dbb7e87d5df44176839411b
