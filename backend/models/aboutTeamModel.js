const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    designation: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("teamabout", aboutUsSchema);
