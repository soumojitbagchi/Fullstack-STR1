const express = require("express");
const productRoutes = express.Router();
const productController = require("../controller/product.controller");

productRoutes.get("/", productController.getAllProducts);
productRoutes.get("/categories", productController.getCategories);
productRoutes.get(
  "/category/:category",
  productController.getProductsByCategory,
);
productRoutes.get("/search", productController.getResults);

module.exports = productRoutes;
