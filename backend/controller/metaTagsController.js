const MetaTags = require("../models/metaTagsModel");

exports.store = async (req, res, next) => {
  try {
    const payload = req.body;
    // Update or create the Header document
    const metaTags = await MetaTags.findOneAndUpdate({}, payload, {
      new: true,
      upsert: true,
    });

    res.json({
      status: 200,
      message: "Meta Tags Updated Successfully",
      metaTags,
    });
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation error", message: err.message });
    }
    // Handle other types of errors
    return res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

exports.index = async (req, res, next) => {
  try {
    const metaTags = await MetaTags.findOne();
    if (!metaTags) {
      return res.json({ status: 404, message: "No Meta Tag found" });
    }
    res.json({
      status: 200,
      message: "MetaTags Fetched Successfully!",
      metaTags,
    });
  } catch (err) {
    console.log(err);
  }
};
