import express from "express";
import cors from "cors";

// Configuration
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server started");
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
