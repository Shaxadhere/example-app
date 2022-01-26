const mongoose = require("mongoose");

const exampleSchema = new mongoose.Schema(
  {
    Title: { type: String },
    Description: { type: String },
    Notes: { type: Array },
    Price: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("example", exampleSchema);
