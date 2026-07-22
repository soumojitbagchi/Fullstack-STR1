const Product = require('../models/product.model')

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message })
  }
}

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params
    const products = await Product.find({ category })
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message })
  }
}

const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category')
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories', error: error.message })
  }
}
const getResults = async(req, res)=>{
  try{
    const {searchedItem}= req.body
    const result = await Product.find({searchedItem}).limit(10)
    res.status(200).json(result)
  }catch{
    res.status(500).json({
      message:"failed to fetched item"
    })
  }
}

module.exports = { getAllProducts, getProductsByCategory, getCategories , getResults}
