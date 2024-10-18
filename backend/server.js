import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config(); // default config .env

const app = express(); // initialize express

// Routes : to access the root route, use whatever port u are using e.g http://localhost:5000
app.get("/products", (reg, res) => {

});

// Starts the server
app.listen(5000, () => {
    connectDB(); // Connect to MongoDB database when server starts up
    console.log('Server started at http://localhost:5000'); // When u run this, if u update anything here, it won't change until u restart the server. Install nodemon to change it automatically
});