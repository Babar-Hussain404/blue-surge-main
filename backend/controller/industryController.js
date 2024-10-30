const Industry = require("../models/industryModel");
const Service = require("../models/serviceModel");
const Product = require("../models/productModel");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

exports.store = async (req, res) => {
  try {
    const { logo, image, detailImage } = req.files;
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

    const [logoName, imageName, detailImageName] = await Promise.all([
      moveFile(logo),
      moveFile(image),
      moveFile(detailImage),
    ]);
    const payload = {
      ...req.body,
      logo: logoName,
      image: imageName,
      detailImage: detailImageName,
    };
    const industry = await Industry.create(payload);
    res.json({
      status: 200,
      message: "Industry Created Successfully",
      industry,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.indexOptions = async (req, res) => {
  try {
    const industries = await Industry.find({}, { _id: 1, name: 1 });
    res.json({
      status: 200,
      message: "Industries Fetched Successfully",
      industries,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.indexAll = async (req, res) => {
  try {
    const industries = await Industry.find();
    res.json({
      status: 200,
      message: "Industries Fetched Successfully",
      industries,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.index = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const industrysPerPage = 10;

    const totalIndustrys = await Industry.countDocuments();

    const from = (page - 1) * industrysPerPage + 1;
    const to = Math.min(from + industrysPerPage - 1, totalIndustrys);

    const industrys = await Industry.find()
      .sort({ updatedAt: -1 })
      .skip(industrysPerPage * (page - 1))
      .limit(industrysPerPage);
    const totalPages = Math.ceil(totalIndustrys / industrysPerPage);
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      industrys,
      meta: {
        currentPage: page,
        totalPages,
        totalIndustrys,
        from,
        to,
        links: paginationLinks,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.single = async (req, res) => {
  try {
    const { id } = req.params;
    const industry = await Industry.findOne({ _id: id });
    if (!industry) {
      return res.json({ status: 404, message: "Industry not found" });
    }
    res.json({ status: 200, message: "Industry Fetched", industry });
  } catch (err) {
    console.log(err);
  }
};
exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const industry = await Industry.findOneAndDelete({ _id: id });
    if (!industry) {
      return res.json({ status: 404, message: "Industry not found" });
    }
    const service = await Service.findOneAndDelete({ industryId: id });
    const product = await Product.findOneAndDelete({ industryId: id });
    res.json({ status: 200, message: "Industry Deleted" });
  } catch (err) {
    console.log(err);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const industry = await Industry.findOne({ _id: id });
    if (!industry) {
      return res.json({ status: 404, message: "Industry not found" });
    }
    const payload = req.body;
    // Function to delete old image from server
    const deleteOldImage = (fileName) => {
      const filePath = path.resolve(__dirname, "..", "../uploads", fileName);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    };

    if (req.files && req.files.image) {
      const { image } = req.files;
      deleteOldImage(industry.image);
      const imageFileName = `${uuidv4()}.jpg`;
      await image.mv(`uploads/${imageFileName}`);
      payload.image = imageFileName;
    }
    if (req.files && req.files.logo) {
      const { logo } = req.files;
      deleteOldImage(industry.logo);
      const logoFileName = `${uuidv4()}.jpg`;
      await logo.mv(`uploads/${logoFileName}`);
      payload.logo = logoFileName;
    }
    if (req.files && req.files.detailImage) {
      const { detailImage } = req.files;
      deleteOldImage(industry.detailImage);
      const logoFileName = `${uuidv4()}.jpg`;
      await detailImage.mv(`uploads/${logoFileName}`);
      payload.detailImage = logoFileName;
    }
    Object.assign(industry, payload);
    await industry.save();

    res.json({
      status: 200,
      message: "Industry Updated Successfully",
      industry,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getTopIndustriesWithServices = async (req, res) => {
  try {
    // Step 1: Retrieve all services
    const services = await Service.find();

    // Step 2: Group services by industryId and count the occurrences
    const industryCountMap = services.reduce((acc, service) => {
      acc[service.industryId] = (acc[service.industryId] || 0) + 1;
      return acc;
    }, {});

    // Step 3: Sort industry IDs by frequency in descending order
    const sortedIndustryIds = Object.keys(industryCountMap).sort(
      (a, b) => industryCountMap[b] - industryCountMap[a]
    );

    // Step 4: Get the top industry IDs
    let topIndustryIds = sortedIndustryIds.slice(0, 10);

    // Step 5: Retrieve the top industries based on the sorted industry IDs
    let topIndustries = await Industry.find({
      _id: { $in: topIndustryIds },
    });

    // Step 6: If there are fewer than 10 industries, retrieve additional industries to make up the difference
    if (topIndustries.length < 10) {
      const additionalIndustries = await Industry.find({
        _id: { $nin: topIndustryIds },
      }).limit(10 - topIndustries.length);

      topIndustries = topIndustries.concat(additionalIndustries);
    }

    // Respond with the top industries
    res.json({
      status: 200,
      message: "Industries Fetched Successfully",
      industrys : topIndustries,
    });

    // res.status(200).json(topIndustries);
  } catch (error) {
    console.error("Error retrieving top industries:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};