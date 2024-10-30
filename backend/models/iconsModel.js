const mongoose = require("mongoose");

const socialIconsSchema = new mongoose.Schema(
  {
    fackbook: {
      type: String,
      default: "",
    },
    linkedIn: {
      type: String,
      default: "",
    },
    youtube: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    mail: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("icons", socialIconsSchema);
