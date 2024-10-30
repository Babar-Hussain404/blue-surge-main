const Partner = require("../models/partnerModel");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

exports.store = async (req, res) => {
  try {
    const { image } = req.files;
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

    const [imageName] = await Promise.all([moveFile(image)]);
    const payload = {
      ...req.body,
      image: imageName,
    };
    const partner = await Partner.create(payload);
    res.json({
      status: 200,
      message: "Partner Created Successfully",
      partner,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.index = async (req, res) => {
  try {
    const partner = await Partner.find();
    res.json({
      status: 200,
      message: "Partner Fetched Successfully",
      partner,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.indexPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const partnersPerPage = 10;

    const totalPartner = await Partner.countDocuments();

    const from = (page - 1) * partnersPerPage + 1;
    const to = Math.min(from + partnersPerPage - 1, totalPartner);

    const partner = await Partner.find()
      .sort({ updatedAt: -1 })
      .skip(partnersPerPage * (page - 1))
      .limit(partnersPerPage);

    const totalPages = Math.ceil(totalPartner / partnersPerPage);
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
        partner,
      meta: {
        currentPage: page,
        totalPages,
        totalPartner,
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
    const partner = await Partner.findOne({ _id: id });
    if (!partner) {
      return res.json({ status: 404, message: "Partner not found" });
    }
    res.json({ status: 200, message: "Partner Fetched", partner });
  } catch (err) {
    console.log(err);
  }
};

exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const partner = await Partner.findOneAndDelete({ _id: id });
    if (!partner) {
      return res.json({ status: 404, message: "Partner not found" });
    }
    res.json({ status: 200, message: "Partner Deleted" });
  } catch (err) {
    console.log(err);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const partner = await Partner.findOne({ _id: id });
    if (!partner) {
      return res.json({ status: 404, message: "Partner not found" });
    }
    const payload = req.body;

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
      deleteOldImage(partner.image);
      const imageFileName = `${uuidv4()}.jpg`;
      await image.mv(`uploads/${imageFileName}`);
      payload.image = imageFileName;
    }
    Object.assign(partner, payload);
    await partner.save();

    res.json({
      status: 200,
      message: "Partner Updated Successfully",
      partner,
    });
  } catch (err) {
    console.log(err);
  }
};
