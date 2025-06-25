const Task = require("../Model/TaskSchema");

const cron = require('node-cron');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "mugeishkumar.2005@gmail.com",
    pass: "zdhb rzzy cikb xqkw",
  },
  tls: { rejectUnauthorized: false },
  port: 587,
  host: 'smtp.gmail.com',
  secure: false,
});

cron.schedule('*/10 * * * *', async () => {
  try {
    const now = new Date();
    const nextHour = new Date(now.getTime() + 60 * 60 * 1000);

    const tasks = await Task.find({
      Date: { $gte: now, $lte: nextHour },
      status: { $ne: "Completed" },
      notified: { $ne: true }
    });

    for (const task of tasks) {
      const user = await User.findOne({ Email: task.createdBy });
      if (!user) continue;

      await transporter.sendMail({
        from: "mugeishkumar.2005@gmail.com",
        to: task.createdBy,
        subject: `⏰ Task Due Soon: ${task.Title}`,
        text: `Hi ${user.username},\n\nYour task "${task.Title}" is due at ${new Date(task.Date).toLocaleString()}.\n\nDon't forget to complete it!`
      });

      await Task.updateOne({ _id: task._id }, { $set: { notified: true } });
    }

    console.log(`[Notifier] Notifications checked at ${new Date().toISOString()}`);
  } catch (error) {
    console.error('Notification error:', error.message);
  }
});


const AddTask = async (req, res) => {
  try {
    const { Title, Discription, Date } = req.body   
    if (!Title || !Discription || !Date) {
        return res.status(400).json({ msg: "All fields are required" });
        }
    const task = new Task({
      Title,
      Discription,
      Date,
      createdBy: req.user.Email,
    });
    await task.save();
    res.status(201).json({ msg: "Task Added", data: task });
  } catch (error) {
    res.status(500).json({ msg: "Error", error: error.message });
  }
};

const GetTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.Email }).sort({ Date: 1, createdAt: 1 });
    res.status(200).json({ msg: "Tasks Found", data: tasks });
  } catch (error) {
    res.status(500).json({ msg: "Error", error: error.message });
  }
};

const UpdateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    const result = await Task.updateOne(
      { _id: id, createdBy: req.user.Email },
      { $set: updateFields }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ msg: "No updates made" });
    }

    res.status(200).json({ msg: "Task Updated", data: result });
  } catch (error) {
    res.status(500).json({ msg: "Error", error: error.message });
  }
};


const DeleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Task.deleteOne({ _id: id, createdBy: req.user.Email });

    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "Task not found or not deleted" });
    }

    res.status(200).json({ msg: "Task Deleted", data: result });
  } catch (error) {
    res.status(500).json({ msg: "Error", error: error.message });
  }
};
const Lapsed = async (req, res) => {
  try {
    const now = new Date();
    const tasks = await Task.find({
      createdBy: req.user.Email,
      Date: { $lt: now },
      status: { $ne: "Completed" },
    }).sort({ Date: 1 });

    res.status(200).json({ msg: "Lapsed Tasks Found", data: tasks });
  } catch (error) {
    res.status(500).json({ msg: "Error", error: error.message });
  }
};

const Completed = async (req, res) => {
  try {
    const tasks = await Task.find({
      createdBy: req.user.Email,
      status: "Completed",
    }).sort({ Date: 1 });

    res.status(200).json({ msg: "Completed Tasks Found", data: tasks });
  } catch (error) {
    res.status(500).json({ msg: "Error", error: error.message });
  }
};

const Pending = async (req, res) => {
  try {
    const tasks = await Task.find({
      createdBy: req.user.Email,
      status: "Pending",
    }).sort({ Date: 1 });

    res.status(200).json({ msg: "Pending Tasks Found", data: tasks });
  } catch (error) {
    res.status(500).json({ msg: "Error", error: error.message });
  }
};

module.exports = { AddTask, GetTasks, UpdateTask, DeleteTask,Lapsed,Pending,Completed};
