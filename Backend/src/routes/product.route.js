const express = require('express')
const productRoutes = express.Router()
const { getAllProducts, getProductsByCategory, getCategories } = require('../controller/product.controller')

productRoutes.get('/', getAllProducts)
productRoutes.get('/categories', getCategories)
productRoutes.get('/category/:category', getProductsByCategory)

module.exports = productRoutes
