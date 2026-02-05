const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const { protect, admin } = require("../middleware/authMiddleware");

const {
	createUser,
} = require("../controllers/userController");

// GET /api/admin/users - list users (admin only)
router.route("/users")
	.get(protect, admin, async (req, res) => {
		const users = await User.find({}).select("-password");
		res.json(users);
	})
	.post(protect, admin, createUser);

// GET /api/admin/stats - dashboard summary
router.get("/stats", protect, admin, asyncHandler(async (req, res) => {
	const userCount = await User.countDocuments({});
	const productCount = await Product.countDocuments({});
	const orderCount = await Order.countDocuments({});
	
	const orders = await Order.find({});
	const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

	// Get sales for last 7 days
	const sevenDaysAgo = new Date();
	sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

	const recentOrders = await Order.find({
		createdAt: { $gte: sevenDaysAgo }
	});

	// Group by date
	const salesData = [];
	for (let i = 6; i >= 0; i--) {
		const date = new Date();
		date.setDate(date.getDate() - i);
		const dateStr = date.toISOString().split('T')[0];
		
		const dayTotal = recentOrders
			.filter(o => o.createdAt.toISOString().split('T')[0] === dateStr)
			.reduce((acc, o) => acc + o.totalPrice, 0);
		
		salesData.push({ date: dateStr, total: dayTotal });
	}

	res.json({
		userCount,
		productCount,
		orderCount,
		totalRevenue,
		salesData
	});
}));

module.exports = router;
