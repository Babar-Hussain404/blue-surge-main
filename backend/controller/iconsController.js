const Icons = require("../models/iconsModel");

exports.store = async (req, res, next) => {
  try {
    const payload = req.body;
    const icons = await Icons.findOneAndUpdate({}, payload, {
      new: true,
      upsert: true,
    });

    res.json({
      status: 200,
      message: "Icons Updated Successfully",
      icons,
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
    const icons = await Icons.findOne();
    if (!icons) {
      return res.json({ status: 404, message: "No Icons found" });
    }
    res.json({
      status: 200,
      message: "Icons Fetched Successfully!",
      icons,
    });
  } catch (err) {
    console.log(err);
  }
};
