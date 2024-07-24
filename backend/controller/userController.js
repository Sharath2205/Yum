import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);

    return res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ success: false, message: "Something went wrong" });
  }
};

const registerUser = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    // Check if the user already exists
    const exists = await userModel.findOne({ email: email });

    if (exists) {
      return res
        .status(200)
        .json({ success: false, message: "User already exists" });
    }

    // Validating email format and strong password
    if (!validator.isEmail(email))
      return res.status(400).json({
        message: "Please enter a valid email",
        success: false,
      });

    if (password.length < 8)
      return res.status(400).json({
        message: "Please enter a valid password",
        success: false,
      });

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      password: hashedPassword,
      email: email,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (err) {
    console.log(err.message);
    return res
      .status(400)
      .json({ success: false, message: "Something went wrong" });
  }
};

export { loginUser, registerUser };
