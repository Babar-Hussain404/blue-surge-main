const mongoose = require("mongoose");

const metaTagsSchema = new mongoose.Schema(
  {
    //home
    homeTitle: {
      type: String,
      default: "",
    },
    homeDescription: {
      type: String,
      default: "",
    },
    homeKeywords: {
      type: String,
      default: "",
    },
    //about
    aboutTitle: {
      type: String,
      default: "",
    },
    aboutDescription: {
      type: String,
      default: "",
    },
    aboutKeywords: {
      type: String,
      default: "",
    },
    //product
    productTitle: {
      type: String,
      default: "",
    },
    productDescription: {
      type: String,
      default: "",
    },
    productKeywords: {
      type: String,
      default: "",
    },
    //service
    serviceTitle: {
      type: String,
      default: "",
    },
    serviceDescription: {
      type: String,
      default: "",
    },
    serviceKeywords: {
      type: String,
      default: "",
    },
    //industry
    industryTitle: {
      type: String,
      default: "",
    },
    industryDescription: {
      type: String,
      default: "",
    },
    industryKeywords: {
      type: String,
      default: "",
    },
    //contact
    contactTitle: {
      type: String,
      default: "",
    },
    contactDescription: {
      type: String,
      default: "",
    },
    contactKeywords: {
      type: String,
      default: "",
    },
    //research
    researchTitle: {
      type: String,
      default: "",
    },
    researchDescription: {
      type: String,
      default: "",
    },
    researchKeywords: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("metatags", metaTagsSchema);
