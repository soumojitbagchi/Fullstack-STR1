require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./src/models/product.model");
const productsData = require("./products.json");

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database successfully!");

    console.log("Clearing existing products...");
    await Product.deleteMany({});
    
    console.log(`Inserting ${productsData.length} products...`);
    await Product.insertMany(productsData);
    
    console.log("Products seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
    console.log("Database connection closed.");
  }
};

seedDatabase();
