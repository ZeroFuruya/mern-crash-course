import mongoose from "mongoose";

// Create a new schema/object
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
},{
    timestamps: true, // adds createdAt and updatedAt fields to our documents
} 
);

const Product = mongoose.model('Product', productSchema); // tells mongoose to create a new schema/object named Product, and use the schema provided
// mongoose will convert Product to products

export default Product;