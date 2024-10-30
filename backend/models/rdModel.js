const mongoose = require("mongoose");

const rdSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      default: "",
    },
    headingParagraph: {
      type: String,
      default: "",
    },
    ourTeam: {
      type: String,
      default: "",
    },
    ourTeamDetail: {
      type: String,
      default: "",
    },
    ourTeamImage: {
      type: String,
      default: "",
    },
    research: {
      type: String,
      default: "",
    },
    researchImage: {
      type: String,
      default: "",
    },

    technology: {
      type: String,
      default: "",
    },
    technologyImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("randd", rdSchema);
