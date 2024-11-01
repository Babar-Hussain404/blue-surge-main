const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const { generateOTP, sendMail } = require("../helper/mailHelper");

const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      role,
      gender,
      dob,
      address_street,
      address_city,
      address_state,
      address_country,
      address_postalCode,
    } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address", email });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists", email });
    }
    if (password.length < 8 || !/[A-Z]/.test(password)) {
      return res.status(400).json({
        error:
          "Password should be at least 8 characters long and contain at least one uppercase letter",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      address_street,
      address_city,
      address_state,
      address_country,
      address_postalCode,
      gender,
      dob,
    });
    const user = await newUser.save();
    if (user) {
      res.status(201).json({ message: "User Created Successfully", user });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    if (user.isBlocked) {
      return res.status(403).json({
        error: "You are blocked. Contact the administrator for assistance.",
      });
    }
    const token = jwt.sign(
      { userId: user._id, userRole: user.role },
      12345,
      {
        expiresIn: "30d",
      }
    );
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get user controller  --Admin
const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the current page from query parameters, default to 1
    const usersPerPage = 10; // Number of users per page
    const totalUsers = await User.countDocuments(); // Get the total number of users

    const from = (page - 1) * usersPerPage + 1; // Calculate 'from' value
    const to = Math.min(from + usersPerPage - 1, totalUsers); // Calculate 'to' value

    const users = await User.find({}, "-password")
      .sort({ updatedAt: -1 }) // Sort by the updatedAt field in descending order (recently updated first)
      .skip(usersPerPage * (page - 1)) // Skip users based on the current page
      .limit(usersPerPage); // Limit the number of users per page

    const totalPages = Math.ceil(totalUsers / usersPerPage); // Calculate total pages

    // Generate pagination links
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      users,
      meta: {
        currentPage: page,
        totalPages,
        totalUsers,
        from,
        to,
        links: paginationLinks,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// logout
const logout = (req, res) => {
  res.setHeader("Authorization", "");
  res.status(200).json({ message: "Logout successful" });
};

const getSingleUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId, { password: 0 }); // Exclude password fields
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userToDelete = await User.findById(userId);

    if (!userToDelete) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const newData = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Assuming you want to restrict certain fields from being updated
    const { password, ...otherData } = newData;

    const userSchema = User.schema;

    // Update user fields based on the provided data
    Object.keys(otherData).forEach((key) => {
      if (userSchema.obj.hasOwnProperty(key)) {
        user[key] = otherData[key];
      }
    });

    // If a new password is provided, hash and update it
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save the updated user data
    const updatedUser = await user.save();
    res.status(200).json({
      message: "User data updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const editUserRole = async (req, res) => {
  try {

    const { userId } = req.params;
    const { role } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.role = role;
    const updatedRole = await user.save();
    res
      .status(200)
      .json({ message: "User role updated successfully", updatedRole });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const blockUser = async (req, res) => {
  try {
    const { userId, isBlocked } = req.body;
    const userToBlock = await User.findById(userId);
    if (!userToBlock) {
      return res.status(404).json({ error: "User not found" });
    }
    userToBlock.isBlocked = isBlocked;
    const user = await userToBlock.save();
    if (isBlocked) {
      return res
        .status(200)
        .json({ message: "User blocked successfully", user });
    }
    res.status(200).json({ message: "User Un-blocked successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signup,
  login,
  getAllUsers,
  logout,
  deleteUser,
  editUser,
  getSingleUserById,
  editUserRole,
  blockUser,
};
