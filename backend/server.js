const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

// ✅ CORS FIX (IMPORTANT FOR VERCEL)
app.use(cors({
  origin: "*", // allow all (safe for your project)
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ ROUTES
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const taskRoutes = require("./routes/task");
app.use("/api/tasks", taskRoutes);

const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);

// ✅ TEST ROUTES
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

app.get("/api", (req, res) => {
  res.send("API working");
});

// ✅ MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// ✅ SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});