import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://sharath:dbpassword@cluster0.jgdu0za.mongodb.net/yum"
    )
    .then(() => console.log("DB connected"));
};
