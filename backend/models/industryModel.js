const mongoose = require("mongoose");

const industrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    logo: {
      type: String,
    },
    email: {
      type: String,
    },
    website: {
      type: String,
    },
    address_street: {
      type: String,
    },
    address_country: {
      type: String,
    },
    address_city: {
      type: String,
    },
    address_state: {
      type: String,
    },
    address_zipcode: {
      type: String,
    },
    tagline: {
      type: String,
    },
    description: {
      type: String,
    },
    detail: {
      type: String,
    },
    detailImage: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("industry", industrySchema);
