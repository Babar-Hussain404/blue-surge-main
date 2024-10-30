const Address = require("../models/addressModel");

exports.store = async (req, res) => {
  try {
    const payload = req.body;
    const address = await Address.create(payload);
    res.json({
      status: 200,
      message: "Contact Address Created Successfully",
      address,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.index = async (req, res) => {
  try {
    const address = await Address.find();
    res.json({
      status: 200,
      message: "Address Fetched Successfully",
      address,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.single = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findOne({ _id: id });
    if (!address) {
      return res.json({ status: 404, message: "Address not found" });
    }
    res.json({ status: 200, message: "Address Fetched", address });
  } catch (err) {
    console.log(err);
  }
};

exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findOneAndDelete({ _id: id });
    if (!address) {
      return res.json({ status: 404, message: "Address not found" });
    } 
    res.json({ status: 200, message: "Address Deleted" });
  } catch (err) {
    console.log(err);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params; 
    const address = await Address.findOne({ _id: id });
    if (!address) {
      return res.json({ status: 404, message: "Address not found" });
    }
    const payload = req.body; 
    Object.assign(address, payload);
    await address.save();
    res.json({
      status: 200,
      message: "Address Updated Successfully",
      address,
    });
  } catch (err) {
    console.log(err);
  }
};
