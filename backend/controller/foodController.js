import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food saved successfully" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Something went wrong" });
  }
};

// List All food items
const listAllFoodItems = async (req, res) => {
  try {
    const foodItems = await foodModel.find({});
    res.json({ success: true, data: foodItems });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Something went wrong" });
  }
};

// Remove food item
const removeFoodItem = async (req, res) => {
  try {
    const foodItem = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${foodItem.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food item deleted successfully" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Something went wrong" });
  }
};

export { addFood, listAllFoodItems, removeFoodItem };
