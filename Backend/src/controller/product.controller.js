import Product from "../models/product.model.js";
import User from "../models/user.model.js";

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

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category: category });
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch categories", error: error.message });
  }
};
const getResults = async (req, res) => {
  try {
    const { name } = req.query;
    const result = await Product.find({
      name: { $regex: name, $options: "i" },
    }).limit(10);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({
      message: "failed to fetched item",
      error: error.message
    });
  }
};
const addProductToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    user.cart.push(productId);
    await user.save();
    res.status(200).json({ message: "Product added to cart successfully" });

  } catch (error) {
    res.status(500).json({ message: "Failed to add product to cart", error: error.message });
  }
}
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("cart");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart", error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.cart.pull(productId);
    await user.save();
    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove product from cart", error: error.message });
  }
};
export default {
  getAllProducts,
  getProductsByCategory,
  getCategories,
  getResults,
  getCart,
  removeFromCart,
  addProductToCart
};
