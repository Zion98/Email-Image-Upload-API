const express = require("express");
const { route } = require("express/lib/router");
const router = express.Router();

const {uploadProductImage}=require("../controllers/uploadProductImage")

const {
  getProduct,
  getAllProducts,
  createProduct,
} = require("../controllers/product");

router.route("/").get(getAllProducts);
router.route("/:id").get(getProduct).post(createProduct);

router.route('/uploads').post(uploadProductImage)

module.exports = router;
