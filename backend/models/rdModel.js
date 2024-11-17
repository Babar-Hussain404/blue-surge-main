const mongoose = require("mongoose");
const { categorySchema } = require("./categoryModel"); // Import categorySchema

const rdSchema = new mongoose.Schema(
  {
    heading: { type: String, default: "" },
    headingParagraph: { type: String, default: "" },
    ourTeam: { type: String, default: "" },
    ourTeamDetail: { type: String, default: "" },
    ourTeamImage: { type: String, default: "" },
    research: { type: String, default: "" },
    researchImage: { type: String, default: "" },
    test: { type: String, default: "" },
    technologyImage: { type: String, default: "" },
    categories: [
      {
        parentCategoryName: { type: String, default: "" },
        subcategories: { type: [categorySchema], default: [] }, // Nullable array of subcategories
      },
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("randd", rdSchema);
