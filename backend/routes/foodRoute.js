import express from "express";
import {
  addFood,
  listAllFoodItems,
  removeFoodItem,
} from "../controller/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Logic to save images in upload folder
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callback) => {
    return callback(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listAllFoodItems);
foodRouter.post("/remove", removeFoodItem);

export default foodRouter;
