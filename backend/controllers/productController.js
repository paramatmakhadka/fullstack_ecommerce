const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

// Admin: create product
const createProduct = asyncHandler(async (req, res) => {
	console.log("Create product request body:", req.body);
	const { name, price, description, image, brand, category, countInStock } =
		req.body;
	const product = new Product({
		name,
		price,
		description,
		image,
		brand,
		category,
		countInStock,
	});
	const created = await product.save();
	console.log("Product created:", created);
	res.status(201).json(created);
});

// Admin: update product
const updateProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		res.status(404);
		throw new Error("Product not found");
	}

	const { name, price, description, image, brand, category, countInStock } =
		req.body;
	product.name = name ?? product.name;
	product.price = price ?? product.price;
	product.description = description ?? product.description;
	product.image = image ?? product.image;
	product.brand = brand ?? product.brand;
	product.category = category ?? product.category;
	product.countInStock = countInStock ?? product.countInStock;

	const updated = await product.save();
	res.json(updated);
});

// Admin: delete product
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		res.status(404);
		throw new Error("Product not found");
	}
	await product.deleteOne();
	res.json({ message: "Product removed" });
});

module.exports = {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
