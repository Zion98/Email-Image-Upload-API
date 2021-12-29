const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");

const getAllProducts = async (req, res) => {
  const product = await Product.find({});
  res.status(StatusCodes.OK).json({ product });
};

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getProduct = (req, res) => {
  const { id } = req.params.id;
  const products=Product.findById({id})
  res.status(200).json({products})
};

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
};
