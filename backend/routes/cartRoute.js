import express from "express";
import authMiddleware from "../middleware/auth.js";

import {
  addToCart,
  removeFromCart,
  getUserCart,
} from "../controller/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);

cartRouter.post("/remove", authMiddleware, removeFromCart);

cartRouter.post("/get", authMiddleware, getUserCart);

export default cartRouter;
