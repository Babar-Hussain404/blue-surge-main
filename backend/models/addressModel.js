const mongoose = require("mongoose");

const contactAddressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    zipcode: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("contactaddress", contactAddressSchema);
