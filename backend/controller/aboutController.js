const About = require("../models/aboutModel");

const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

exports.store = async (req, res, next) => {
  try {
    // const { whoWeAreImage, missionImage, visionImage } = req.files;
    const uploadDir = path.join(__dirname, "..", "../uploads");

    // Function to move file to upload directory and generate unique filename
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

    // Destructure old file names from req.body
    const { oldWhoWeAreImage, oldMissionImage, oldVisionImage } = req.body;

    const [whoWeAreImageName, missionImageName, visionImageName] =
      await Promise.all([
        req?.files?.whoWeAreImage
          ? moveFile(req.files.whoWeAreImage)
          : oldWhoWeAreImage,
        req?.files?.missionImage
          ? moveFile(req.files.missionImage)
          : oldMissionImage,
        req?.files?.visionImage
          ? moveFile(req.files.visionImage)
          : oldVisionImage,
      ]);

    const payload = {
      ...req.body,
      whoWeAreImage: whoWeAreImageName,
      missionImage: missionImageName,
      visionImage: visionImageName,
    };

    // Update or create the About document
    const about = await About.findOneAndUpdate({}, payload, {
      new: true,
      upsert: true,
    });

    res.json({ status: 200, message: "About created Successfully", about });
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
    const about = await About.findOne();
    if (!about) {
      return res.json({ status: 404, message: "No about found" });
    }
    res.json({ status: 200, message: "About Fetched Successfully!", about });
  } catch (err) {
    console.log(err);
  }
};
