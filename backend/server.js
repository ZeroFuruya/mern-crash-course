import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config(); // default config .env

const app = express(); // initialize express

app.use(express.json()); // parses JSON data. allows us to accept JSON data in the req.body -- this is a middleware, called after getting a req and before giving a res

app.use("/api/products", productRoutes); // Prefix

// Routes : to access the root route, use whatever port u are using e.g http://localhost:5000

app.get("/", (req, res) => {
  res.send(productRoutes.toString()); // Responds with "Hello World" when you access the root URL
});

// Starts the server
app.listen(6969, () => {
  connectDB(); // Connect to MongoDB database when server starts up
  console.log("Server started at http://localhost:6969"); // When u run this, if u update anything here, it won't change until u restart the server. Install nodemon to change it automatically
});
