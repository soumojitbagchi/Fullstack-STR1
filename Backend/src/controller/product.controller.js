import Product from "../models/product.model.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};

const getProductsByCatagory = async (req, res) => {
  try {
    const { catagory } = req.params;
    const products = await Product.find({ category: catagory });
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};

const getCatagories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch catagories", error: error.message });
  }
};
const getResults = async (req, res) => {
  try {
    const { name } = req.query;
    const result = await Product.find({
      name: { $regex: name, $options: "i" },
    }).limit(10);
    res.status(200).json({ result });
  } catch {
    res.status(500).json({
      message: "failed to fetched item",
    });
  }
};
export default {
  getAllProducts,
  getProductsByCatagory,
  getCatagories,
  getResults,
};
