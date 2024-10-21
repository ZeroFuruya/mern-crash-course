import express from 'express';
import mongoose from 'mongoose';

import Product from '../models/product.model.js';

const router = express.Router();

// GET method from/products
router.get("/", async (req, res) => {
    try{
        const products = await Product.find({}); // if empty body, retrieves all documents from Product model
        res.status(200).json({success: true, data: products});
    } catch(error){
        console.error("Error in Fetch Products: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
});

// POST method to/products
router.post("/", async (req, res) => {
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

// UPDATE method from/products
router.put("/:id", async (req, res) => {
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

// DELETE method from/products
router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted successfully"});
    }catch(error){
        console.Console.error("Error in deleting Product: ", error.message);
        res.status(404).json({success: false, message:"Product not found"});
    }
});

// To test out APIs without frontend, use Postman

export default router;