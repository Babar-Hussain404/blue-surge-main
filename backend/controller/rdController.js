const RD = require("../models/rdModel");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

exports.store = async (req, res, next) => {
  try {
    console.log("Incoming categories payload:", req.body.categories);

    const uploadDir = path.join(__dirname, "..", "../uploads");
    const moveFile = async (file) => {
      const fileExtension = path.extname(file.name);
      const uniqueFileName = `${uuidv4()}${fileExtension}`;
      const filePath = path.join(uploadDir, uniqueFileName);
      await file.mv(filePath);
      return uniqueFileName;
    };

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const { oldTeamImage, oldResearchImage, oldTechnologyImage } = req.body;

    const [whoWeAreImageName, missionImageName, visionImageName] =
      await Promise.all([
        req?.files?.ourTeamImage
          ? moveFile(req.files.ourTeamImage)
          : oldTeamImage,
        req?.files?.researchImage
          ? moveFile(req.files.researchImage)
          : oldResearchImage,
        req?.files?.technologyImage
          ? moveFile(req.files.technologyImage)
          : oldTechnologyImage,
      ]);

    const payload = {
      ...req.body,
      ourTeamImage: whoWeAreImageName,
      researchImage: missionImageName,
      technologyImage: visionImageName,
    };
    const rd = await RD.findOneAndUpdate({}, 
      {
    $set: {
      ...payload,
      categories: payload.categories, // Replace existing categories
    },
  }
  , {
      new: true,
      upsert: true,
    });

    res.json({
      status: 200,
      message: "Research and Development created Successfully",
      rd,
    });
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation error", message: err.message });
    }
    return res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

exports.index = async (req, res, next) => {
  try {
    const rd = await RD.findOne();
    if (!rd) {
      return res.json({ status: 404, message: "No about found" });
    }
    res.json({ status: 200, message: "RD Fetched Successfully!", rd });
  } catch (err) {
    console.log(err);
  }
};
