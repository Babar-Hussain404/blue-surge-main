const Service = require("../models/serviceModel");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const Industry = require("../models/industryModel");
const Product = require("../models/productModel");
exports.store = async (req, res) => {
  try {
    const { thumbnailImage, detailImage } = req.files;
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

    const [thumbnailImageName, detailImageName] = await Promise.all([
      moveFile(thumbnailImage),
      moveFile(detailImage),
    ]);
    const payload = {
      ...req.body,
      thumbnailImage: thumbnailImageName,
      detailImage: detailImageName,
    };
    const service = await Service.create(payload);
    res.json({
      status: 200,
      message: "Industry Created Successfully",
      service,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.indexOptions = async (req, res) => {
  const { industryId } = req.params;

  try {
    const industry = await Industry.findById(industryId);
    if (!industry) {
      return res
        .status(404)
        .json({ status: 404, message: "Industry not found" });
    }

    const services = await Service.find({ industryId }, { _id: 1, name: 1 });

    res.status(200).json({
      status: 200,
      message: "Services Fetched Successfully",
      services,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.index = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const servicesPerPage = 8;

    const totalServices = await Service.countDocuments();

    const from = (page - 1) * servicesPerPage + 1;
    const to = Math.min(from + servicesPerPage - 1, totalServices);

    const services = await Service.find()
      .sort({ updatedAt: -1 })
      .skip(servicesPerPage * (page - 1))
      .limit(servicesPerPage);

    if (services && services.length > 0) {
      for (const service of services) {
        const industry = await Industry.findById(service.industryId);
        service.industry_data = [
          {
            _id: industry._id,
            name: industry.name,
            email: industry.email,
          },
        ];
      }
    }

    const totalPages = Math.ceil(totalServices / servicesPerPage);
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      services,
      meta: {
        currentPage: page,
        totalPages,
        totalServices,
        from,
        to,
        links: paginationLinks,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getServicesByIndustryId = async (req, res) => {
  try {
    const { industryId } = req.params;
    const services = await Service.find({ industryId });
    res.status(200).json({
      services,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getServicesByIndustryIdHome = async (req, res) => {
  try {
    const {industryId} = req.query
    let services = []
    if(industryId){
      services = await Service.find({ industryId: industryId });
    }
    else{
      services = await Service.find().limit(6);
    }
    res.status(200).json({
      services,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.indexAll = async (req, res) => {
  try {
    const service = await Service.find();
    res.json({
      status: 200,
      message: "Services Fetched Successfully",
      service,
    });
  } catch (err) {
    console.log(err);
  }
};
// exports.getServicesByIndustryIds = async (req, res) => {
//   try {
//     const { industryIds } = req.params;
//     const industryIdArray = industryIds.split(","); // Splitting comma-separated industryIds
//     const services = await Service.find({ industryId: { $in: industryIdArray } });
//     res.status(200).json({
//       services,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
exports.getServicesByIndustryIds = async (req, res) => {
  try {
    const { industryIds } = req.params;
    const industryIdArray = industryIds.split(","); // Splitting comma-separated industryIds
    const page = parseInt(req.query.page) || 1;
    const servicesPerPage = 8;

    const totalServices = await Service.countDocuments({
      industryId: { $in: industryIdArray },
    });

    const from = (page - 1) * servicesPerPage + 1;
    const to = Math.min(from + servicesPerPage - 1, totalServices);

    const services = await Service.find({
      industryId: { $in: industryIdArray },
    })
      .sort({ updatedAt: -1 })
      .skip(servicesPerPage * (page - 1))
      .limit(servicesPerPage);

    if (services && services.length > 0) {
      for (const service of services) {
        const industry = await Industry.findById(service.industryId);
        service.industry_data = [
          {
            _id: industry._id,
            name: industry.name,
            email: industry.email,
          },
        ];
      }
    }

    const totalPages = Math.ceil(totalServices / servicesPerPage);
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      services,
      meta: {
        currentPage: page,
        totalPages,
        totalServices,
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
    const service = await Service.findOne({ _id: id });
    if (!service) {
      return res.json({ status: 404, message: "Service not found" });
    }
    const industry = await Industry.findById(service.industryId);
    service.industry_data = [
      {
        _id: industry._id,
        name: industry.name,
        email: industry.email,
      },
    ];
    res.json({ status: 200, message: "Service Fetched", service });
  } catch (err) {
    console.log(err);
  }
};

exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findOneAndDelete({ _id: id });
    if (!service) {
      return res.json({ status: 404, message: "Service not found" });
    }
    const product = await Product.findOneAndDelete({ serviceId: id });
    res.json({ status: 200, message: "Service Deleted" });
  } catch (err) {
    console.log(err);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findOne({ _id: id });
    if (!service) {
      return res.json({ status: 404, message: "Service not found" });
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

    if (req.files && req.files.thumbnailImage) {
      const { thumbnailImage } = req.files;
      deleteOldImage(service.thumbnailImage);
      const thumbnailImageFileName = `${uuidv4()}.jpg`;
      await thumbnailImage.mv(`uploads/${thumbnailImageFileName}`);
      payload.thumbnailImage = thumbnailImageFileName;
    }
    if (req.files && req.files.detailImage) {
      const { detailImage } = req.files;
      deleteOldImage(service.detailImage);
      const detailImageFileName = `${uuidv4()}.jpg`;
      await detailImage.mv(`uploads/${detailImageFileName}`);
      payload.detailImage = detailImageFileName;
    }
    Object.assign(service, payload);
    await service.save();

    res.json({
      status: 200,
      message: "Service Updated Successfully",
      service,
    });
  } catch (err) {
    console.log(err);
  }
};
