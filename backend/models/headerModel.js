const mongoose = require("mongoose");

const headerSchema = new mongoose.Schema(
  {
    homeHeading: {
      type: String,
      default: "",
    },
    homeDescription: {
      type: String,
      default: "",
    },
    homeImage: {
      type: String,
      default: "",
    },
    aboutHeading: {
      type: String,
      default: "",
    },
    aboutDescription: {
      type: String,
      default: "",
    },
    aboutImage: {
      type: String,
      default: "",
    },
    productHeading: {
      type: String,
      default: "",
    },
    productDescription: {
      type: String,
      default: "",
    },
    productImage: {
      type: String,
      default: "",
    },
    serviceHeading: {
      type: String,
      default: "",
    },
    serviceDescription: {
      type: String,
      default: "",
    },
    serviceImage: {
      type: String,
      default: "",
    },
    researchHeading: {
      type: String,
      default: "",
    },
    researchDescription: {
      type: String,
      default: "",
    },
    researchImage: {
      type: String,
      default: "",
    },
    businessHeading: {
      type: String,
      default: "",
    },
    businessDescription: {
      type: String,
      default: "",
    },
    businessImage: {
      type: String,
      default: "",
    },
    contactHeading: {
      type: String,
      default: "",
    },
    contactDescription: {
      type: String,
      default: "",
    },
    contactImage: {
      type: String,
      default: "",
    },
    // details
    
    businessDetailImage: {
      type: String,
      default: "",
    },


 
      serviceDetailImage: {
        type: String,
        default: "",
      },

      productDetailImage: {
        type: String,
        default: "",
      },
  },
  { timestamps: true }
);
module.exports = mongoose.model("header", headerSchema);
