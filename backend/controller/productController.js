const Product = require("../models/productModel");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const Industry = require("../models/industryModel");
const Service = require("../models/serviceModel");
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

    let videoName = ""; // Initialize videoName variable

    if (req.files && req.files.video) {
      const { video } = req.files;
      videoName = await moveFile(video); // Save the video if it exists
    }

    const payload = {
      ...req.body,
      thumbnailImage: thumbnailImageName,
      detailImage: detailImageName,
      video: videoName, // Assign videoName to payload
    };

    const product = await Product.create(payload);
    res.json({ status: 200, message: "Product Created Successfully", product });
  } catch (err) {
    console.log(err);
  }
};

exports.getRandomProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $sample: { size: 10 } }, // Retrieve 10 random products
    ]);

    // Shuffle the array of products
    const shuffledProducts = shuffleArray(products);

    res.status(200).json({
      products: shuffledProducts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

exports.getProductsByServiceId = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const products = await Product.find({ serviceId });

    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getProductsByIndustryId = async (req, res) => {
  try {
    const { industryId } = req.params;
    const products = await Product.find({ industryId });
    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.index = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const productsPerPage = 9;

    const totalProducts = await Product.countDocuments();

    const from = (page - 1) * productsPerPage + 1;
    const to = Math.min(from + productsPerPage - 1, totalProducts);

    const products = await Product.find()
      .sort({ updatedAt: -1 })
      .skip(productsPerPage * (page - 1))
      .limit(productsPerPage);

    if (products && products.length > 0) {
      for (const product of products) {
        const industry = await Industry.findById(product.industryId);
        const service = await Service.findById(product.serviceId);

        if (industry) {
          product.industry_data = [
            {
              _id: industry._id,
              name: industry.name,
              email: industry.email,
            },
          ];
        }
        if (service) {
          product.service_data = [
            {
              _id: service._id,
              name: service.name,
            },
          ];
        }
      }
    }

    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      products,
      meta: {
        currentPage: page,
        totalPages,
        totalProducts,
        from,
        to,
        links: paginationLinks,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getProductsByServiceAndIndustryIds = async (req, res) => {
  try {
    const { serviceIds, industryIds } = req.params;
    const page = parseInt(req.query.page) || 1;
    const productsPerPage = 10;

    // Split comma-separated IDs into arrays
    const serviceIdArray = serviceIds.split(",");
    const industryIdArray = industryIds.split(",");

    // Count total products matching the criteria
    const totalProducts = await Product.countDocuments({
      serviceId: { $in: serviceIdArray },
      industryId: { $in: industryIdArray },
    });

    const from = (page - 1) * productsPerPage + 1;
    const to = Math.min(from + productsPerPage - 1, totalProducts);

    // Find products matching the criteria with pagination
    const products = await Product.find({
      serviceId: { $in: serviceIdArray },
      industryId: { $in: industryIdArray },
    })
      .sort({ updatedAt: -1 })
      .skip(productsPerPage * (page - 1))
      .limit(productsPerPage);

    if (products && products.length > 0) {
      for (const product of products) {
        const industry = await Industry.findById(product.industryId);
        const service = await Service.findById(product.serviceId);
        if (industry) {
          product.industry_data = [
            {
              _id: industry._id,
              name: industry.name,
              email: industry.email,
            },
          ];
        }
        if (service) {
          product.service_data = [
            {
              _id: service._id,
              name: service.name,
            },
          ];
        }
      }
    }

    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      products,
      meta: {
        currentPage: page,
        totalPages,
        totalProducts,
        from,
        to,
        links: paginationLinks,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductsByIndustryIds = async (req, res) => {
  try {
    const { industryIds } = req.params;
    const page = parseInt(req.query.page) || 1;
    const productsPerPage = 9;

    // Split comma-separated industry IDs into an array
    const industryIdArray = industryIds.split(",");

    // Count total products matching the industry IDs
    const totalProducts = await Product.countDocuments({
      industryId: { $in: industryIdArray },
    });

    const from = (page - 1) * productsPerPage + 1;
    const to = Math.min(from + productsPerPage - 1, totalProducts);

    // Find products matching the industry IDs with pagination
    const products = await Product.find({
      industryId: { $in: industryIdArray },
    })
      .sort({ updatedAt: -1 })
      .skip(productsPerPage * (page - 1))
      .limit(productsPerPage);

    if (products && products.length > 0) {
      for (const product of products) {
        const industry = await Industry.findById(product.industryId);
        const service = await Service.findById(product.serviceId);
        if (industry) {
          product.industry_data = [
            {
              _id: industry._id,
              name: industry.name,
              email: industry.email,
            },
          ];
        }
        if (service) {
          product.service_data = [
            {
              _id: service._id,
              name: service.name,
            },
          ];
        }
      }
    }

    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      products,
      meta: {
        currentPage: page,
        totalPages,
        totalProducts,
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
    const product = await Product.findOne({ _id: id });
    if (!product) {
      return res.json({ status: 404, message: "Product not found" });
    }
    const industry = await Industry.findById(product.industryId);
    const service = await Service.findById(product.serviceId);
    product.industry_data = [
      {
        _id: industry._id,
        name: industry.name,
        email: industry.email,
      },
    ];
    product.service_data = [
      {
        _id: service._id,
        name: service.name,
      },
    ];

    res.json({ status: 200, message: "Product Fetched", product });
  } catch (err) {
    console.log(err);
  }
};
exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOneAndDelete({ _id: id });
    if (!product) {
      return res.json({ status: 404, message: "Product not found" });
    }
    res.json({ status: 200, message: "Product Deleted" });
  } catch (err) {
    console.log(err);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Product.findOne({ _id: id });
    if (!service) {
      return res.json({ status: 404, message: "Product not found" });
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
      deleteOldImage(service.thumbnailImage); // Delete old image from server
      const thumbnailImageFileName = `${uuidv4()}.jpg`; // Generate unique filename with UUID
      await thumbnailImage.mv(`uploads/${thumbnailImageFileName}`); // Upload new image to server
      payload.thumbnailImage = thumbnailImageFileName; // Update req.body with new image filename
    }
    if (req.files && req.files.detailImage) {
      const { detailImage } = req.files;
      deleteOldImage(service.detailImage); // Delete old logo from server
      const detailImageFileName = `${uuidv4()}.jpg`; // Generate unique filename with UUID
      await detailImage.mv(`uploads/${detailImageFileName}`); // Upload new logo to server
      payload.detailImage = detailImageFileName; // Update req.body with new logo filename
    }
    if (req.files && req.files.video) {
      const { video } = req.files;
      deleteOldImage(service.video); // Delete old logo from server
      const videoFileName = `${uuidv4()}.jpg`; // Generate unique filename with UUID
      await video.mv(`uploads/${videoFileName}`); // Upload new logo to server
      payload.video = videoFileName; // Update req.body with new logo filename
    }
    Object.assign(service, payload);
    await service.save();

    res.json({
      status: 200,
      message: "Product Updated Successfully",
      service,
    });
  } catch (err) {
    console.log(err);
  }
};

// exports.update = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { image, logo } = req.files;

//     const product = await Product.findOne({ _id: id })
//     if (!product) {
//       return res.json({ status: 404, message: "Product not found" });
//     }
//     const payload=req.body;
//     const deleteOldImage = (fileName) => {
//       const filePath = path.resolve(__dirname, '..', '../uploads', fileName);
//       fs.unlink(filePath, (err) => {
//         if (err) {
//           console.log(err);
//         }
//       });
//     };

//     // Check if image or logo is present in req.files, then delete old ones and upload new ones
//     if (image) {
//         deleteOldImage(product.image); // Delete old image from server
//       const imageFileName = `${uuidv4()}.jpg`; // Generate unique filename with UUID
//       await image.mv(`uploads/${imageFileName}`); // Upload new image to server
//       payload.image = imageFileName; // Update req.body with new image filename
//     }
//     if (logo) {
//         deleteOldImage(product.logo); // Delete old logo from server
//       const logoFileName = `${uuidv4()}.jpg`; // Generate unique filename with UUID
//       await logo.mv(`uploads/${logoFileName}`); // Upload new logo to server
//       payload.logo = logoFileName; // Update req.body with new logo filename
//     }
//     Object.assign(product, payload);
//     await product.save();

//     res.json({
//       status: 200,
//       message: "Product Updated Successfully",
//       product,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
