const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    industryId: {
      // type:mongoose.Schema.Types.ObjectId,
      // ref:"industry"
      type: String,
      required: true,
    },
    serviceId: {
      // type:mongoose.Schema.Types.ObjectId,
      // ref:"service"
      type: String,
      required: true,
    },
    industry_data: [],
    service_data: [],
    name: {
      type: String,
    },
    thumbnailImage: {
      type: String,
    },
    video_description: {
      type: String,
    },
    detail: { 
      type: String,
    },
    detailImage: {
      type: String,
    },
    features: [
      {
        type: String,
        value: String,
      },
    ],
    video: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("product", productSchema);
