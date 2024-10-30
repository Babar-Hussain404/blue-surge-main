const Team = require("../models/aboutTeamModel");
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
    const team = await Team.create(payload);
    res.json({
      status: 200,
      message: "Team Member Created Successfully",
      team,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.index = async (req, res) => {
  try {
    const team = await Team.find();
    res.json({
      status: 200,
      message: "Team Member Fetched Successfully",
      team,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.indexPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const teamsPerPage = 10;

    const totalTeam = await Team.countDocuments();

    const from = (page - 1) * teamsPerPage + 1;
    const to = Math.min(from + teamsPerPage - 1, totalTeam);

    const team = await Team.find()
      .sort({ updatedAt: -1 })
      .skip(teamsPerPage * (page - 1))
      .limit(teamsPerPage);

    const totalPages = Math.ceil(totalTeam / teamsPerPage);
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      team,
      meta: {
        currentPage: page,
        totalPages,
        totalTeam,
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
    const team = await Team.findOne({ _id: id });
    if (!team) {
      return res.json({ status: 404, message: "Team not found" });
    }
    res.json({ status: 200, message: "Team Member Fetched", team });
  } catch (err) {
    console.log(err);
  }
};

exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findOneAndDelete({ _id: id });
    if (!team) {
      return res.json({ status: 404, message: "Team Member not found" });
    }
    res.json({ status: 200, message: "Team Member Deleted" });
  } catch (err) {
    console.log(err);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findOne({ _id: id });
    if (!team) {
      return res.json({ status: 404, message: "Team not found" });
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
      deleteOldImage(team.image);
      const imageFileName = `${uuidv4()}.jpg`;
      await image.mv(`uploads/${imageFileName}`);
      payload.image = imageFileName;
    }
    Object.assign(team, payload);
    await team.save();

    res.json({
      status: 200,
      message: "Team Member Updated Successfully",
      team,
    });
  } catch (err) {
    console.log(err);
  }
};
