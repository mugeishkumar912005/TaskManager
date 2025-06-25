const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config(); 

const userRoutes = require("./Router/UserRoutes");
const TaskRoutes=require("./Router/TaskRoutes")

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/taskmanager")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


app.use("/api/users", userRoutes);
app.use("/api/tasks", TaskRoutes);


app.get("/", (req, res) => {
  res.send("🚀 Task Manager API Running");
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
