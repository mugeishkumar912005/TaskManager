const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Discription: { type: String },
  Date: { type: Date, required: true },
  createdBy: { type: String, required: true },
  notified: { type: Boolean, default: false },
  status: { type: String, default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);
