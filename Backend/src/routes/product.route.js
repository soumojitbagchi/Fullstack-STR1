import express from "express";
const productRoutes = express.Router();
import productController from "../controller/product.controller.js";

productRoutes.get("/", productController.getAllProducts);
productRoutes.get("/categories", productController.getCategories);
productRoutes.get(
  "/category/:category",
  productController.getProductsByCategory,
);
productRoutes.get("/search", productController.getResults);


export default productRoutes;
