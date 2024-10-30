const Header = require("../models/headerModel");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

exports.store = async (req, res, next) => {
  try {
    const uploadDir = path.join(__dirname, "..", "../uploads");
    const moveFile = async (file) => {
      const fileExtension = path.extname(file.name);
      const uniqueFileName = `${uuidv4()}${fileExtension}`;
      const filePath = path.join(uploadDir, uniqueFileName);
      await file.mv(filePath);
      return uniqueFileName;
    };

    // const deleteFile = async (fileName) => {
    //     if (fileName) {
    //         const filePath = path.join(uploadDir, fileName);
    //         if (fs.existsSync(filePath)) {
    //             fs.unlinkSync(filePath);
    //         }
    //     }
    // };

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const {
      oldHomeImage,
      oldAboutImage,
      oldProductImage,
      oldProductDetailImage,
      oldServiceImage,
      oldServiceDetailImage,
      oldResearchImage,
      oldBusinessImage,
      oldBusinessDetailImage,
      oldContactImage,
    } = req.body;

    const [
      homeImageName,
      aboutImageName,
      productImageName,
      productDetailImageName,
      serviceImageName,
      serviceDetailImageName,
      researchImageName,
      businessImageName,
      businessDetailImageName,
      contactImageName,
    ] = await Promise.all([
      req?.files?.homeImage ? moveFile(req.files.homeImage) : oldHomeImage,
      req?.files?.aboutImage ? moveFile(req?.files?.aboutImage) : oldAboutImage,
      req?.files?.productImage
        ? moveFile(req?.files?.productImage)
        : oldProductImage,
      req?.files?.productDetailImage
        ? moveFile(req?.files?.productDetailImage)
        : oldProductDetailImage,
      req?.files?.serviceImage
        ? moveFile(req?.files?.serviceImage)
        : oldServiceImage,
      req?.files?.serviceDetailImage
        ? moveFile(req?.files?.serviceDetailImage)
        : oldServiceDetailImage,
      req?.files?.researchImage
        ? moveFile(req?.files?.researchImage)
        : oldResearchImage,
      req?.files?.businessImage
        ? moveFile(req?.files?.businessImage)
        : oldBusinessImage,
      req?.files?.businessDetailImage
        ? moveFile(req?.files?.businessDetailImage)
        : oldBusinessDetailImage,
      req?.files?.contactImage
        ? moveFile(req?.files?.contactImage)
        : oldContactImage,
    ]);

    const payload = {
      ...req.body,
      homeImage: homeImageName,
      aboutImage: aboutImageName,
      productImage: productImageName,
      productDetailImage: productDetailImageName,
      serviceImage: serviceImageName,
      serviceDetailImage: serviceDetailImageName,
      researchImage: researchImageName,
      businessImage: businessImageName,
      businessDetailImage: businessDetailImageName,
      contactImage: contactImageName,
    };

    // Update or create the Header document
    const header = await Header.findOneAndUpdate({}, payload, {
      new: true,
      upsert: true,
    });

    res.json({ status: 200, message: "Header created Successfully", header });
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
    const header = await Header.findOne();
    if (!header) {
      return res.json({ status: 404, message: "No header found" });
    }
    res.json({ status: 200, message: "Header Fetched Successfully!", header });
  } catch (err) {
    console.log(err);
  }
};
