const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    industryId: { 
      type: String,
      required: true,
    },
    industry_data: [],
    name: {
      type: String,
    },
    thumbnailImage: {
      type: String,
    },
    detail: {
      type: String,
    },
    industry_name: {
      type: String,
    },
    detailImage: {
      type: String,
    },
    advantages: [
      {
        type: String,
        value: String,
      },
    ], 
  },
  { timestamps: true }
);
module.exports = mongoose.model("service", serviceSchema);
