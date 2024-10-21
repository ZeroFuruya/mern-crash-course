import express from "express";

import {
  getProducts,
  postProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// GET method from controllers/product.controller.js
router.get("/", getProducts);

// POST method from controllers/product.controller.js
router.post("/", postProducts);

// UPDATE method from controllers/product.controller.js
router.put("/:id", updateProduct);

// DELETE method from controllers/product.controller.js
router.delete("/:id", deleteProduct);

// To test out APIs without frontend, use Postman

export default router;
