const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema(
  {
    title: {
      type: String, 
    }, 
    image: {
      type: String, 
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("partners", partnerSchema);
