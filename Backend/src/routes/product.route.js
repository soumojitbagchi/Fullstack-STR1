const express = require("express");
const productRoutes = express.Router();
const productController = require("../controller/product.controller");

productRoutes.get("/", productController.getAllProducts);
productRoutes.get("/catagories", productController.getCatagories);
productRoutes.get(
  "/catagory/:catagory",
  productController.getProductsByCatagory,
);
productRoutes.get("/search", productController.getResults);

module.exports = productRoutes;
