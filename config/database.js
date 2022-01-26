const mongoose = require("mongoose");

const { DB_STRING } = process.env;

exports.connect = () => {
  mongoose
    .connect(DB_STRING, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log(`Error connecting to database: ${error.message}`);
    });
};
