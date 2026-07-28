import express from "express";
const productRoutes = express.Router();
import productController from "../controller/product.controller.js";

productRoutes.get("/", productController.getAllProducts);
productRoutes.get("/catagories", productController.getCatagories);
productRoutes.get(
  "/catagory/:catagory",
  productController.getProductsByCatagory,
);
productRoutes.get("/search", productController.getResults);


export default productRoutes;
