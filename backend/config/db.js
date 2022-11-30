//Importing mongoose
const { error } = require("console");
const mongoose = require("mongoose");

//Destructuring mongo_url from .env file
const { MONGO_URL } = process.env;

//Exporting
exports.db = () => {
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    //On successful connection
    .then((conn) => {
      console.log(`Database connected successfully on ${conn.connection.host}`);
    })

    //On failure
    .catch((error) => {
      console.log("Database connection failed");
      console.log(error);
      process.exit(1);
    });
};
