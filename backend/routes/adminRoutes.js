const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { protect, admin } = require("../middleware/authMiddleware");

const {
	createUser,
} = require("../controllers/userController");

// GET /api/admin/users - list users (admin only)
router
	.route("/users")
	.get(protect, admin, async (req, res) => {
		const users = await User.find({}).select("-password");
		res.json(users);
	})
	.post(protect, admin, createUser);

module.exports = router;
