  const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      selected: false,
    },  
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [
        "super_admin",
        "admin",
      ],
      default: "admin",
    }, 
    address_street: {
      type: String,
      required: true,
    },
    address_city: {
      type: String,
      required: true,
    },
    address_state: {
      type: String,
      required: true,
    },
    address_country: {
      type: String,
      required: true,
    },
    address_postalCode: {
      type: String,
      required: true,
    }, 
    isBlocked: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    dob: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
