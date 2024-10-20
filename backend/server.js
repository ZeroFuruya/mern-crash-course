import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/Product.js'; // import the Product model
import mongoose from 'mongoose';

dotenv.config(); // default config .env

const app = express(); // initialize express

app.use(express.json()); // parses JSON data. allows us to accept JSON data in the req.body -- this is a middleware, called after getting a req and before giving a res

// Routes : to access the root route, use whatever port u are using e.g http://localhost:5000

// GET method to/products
app.get("/api/products", async (req, res) => {
    try{
        const products = await Product.find({}); // if empty body, retrieves all documents from Product model
        res.status(200).json({success: true, data: products});
    } catch(error){
        console.error("Error in Fetch Products: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
});

// POST method to/products
app.post("/api/products", async (req, res) => {
    const product = req.body; // user will send this data

    // Validates the product sent by the user. If valid, create a new product
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch(error){
        console.error("Error in Create Product: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
});

app.put("/api/products/:id", async (req, res) => {
    const { id } = req.params;

    const product = req.body; // user will send this

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success: false, message: "Product not found"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
});

// DELETE method to/products
app.delete("/api/products/:id", async (req, res) => {
    const {id} = req.params;
    
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted successfully"});
    }catch(error){
        console.Console.error("Error in deleting Product: ", error.message);
        res.status(404).json({success: false, message:"Product not found"});
    }
});

// TODO: UPDATE method

// To test out APIs without frontend, use Postman

// Starts the server
app.listen(5000, () => {
    connectDB(); // Connect to MongoDB database when server starts up
    console.log('Server started at http://localhost:5000'); // When u run this, if u update anything here, it won't change until u restart the server. Install nodemon to change it automatically
});