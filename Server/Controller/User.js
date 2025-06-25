const nodemailer = require('nodemailer');
const User = require("../Model/UserSchema.js");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

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

const sendWelcomeEmail = (email, name) => {
  const mailOptions = {
    from: "mugeishkumar.2005@gmail.com",
    to: email,
    subject: `Welcome to TaskMAnager Mr/Ms. ${name}`,
    text: 'Manage your Tasks and Time Properly with us!😊✅',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.error('Error sending email:', error);
    else console.log('Email sent: ' + info.response);
  });
};
const AddUser = async (req, res) => {
  try {
    const { Name, Email, Password, Confirm_Password } = req.body;

    if (!Name || !Email || !Password || !Confirm_Password) {
      return res.status(400).json({ Msg: "All fields are required" });
    }

    if (Password !== Confirm_Password) {
      return res.status(400).json({ Msg: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ Email });

    if (existingUser) {
      return res.status(400).json({ Msg: "Email already exists." });
    }

    const Hashed_Password = await bcrypt.hash(Password, 10);

    const New_user = new User({
      Name,
      Email,
      Password: Hashed_Password,
    });

    await New_user.save();

    sendWelcomeEmail(Email, Name);

    res.status(201).json({
      Msg: "Successfully Stored",
      Data: New_user,
    });

  } catch (error) {

    res.status(500).json({
      Msg: "Server error",
      error: error.message,
    });
  }
};


const Login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const user = await User.findOne({ Email });
    if (!user) return res.status(403).json({ Msg: "User not found" });

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) return res.status(401).json({ Msg: "Invalid credentials" });

    const token = JWT.sign({ Email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ Msg: "Login successful", Data: user, Token: token });
  } catch (error) {
    res.status(500).json({ Msg: "Server error", error: error.message });
  }
};

const GetData = async (req, res) => {
  try {
    const Email = req.user?.Email;
    if (!Email) return res.status(401).json({ Msg: "Unauthorized" });

    const user = await User.findOne({ Email });
    res.status(200).json({ Msg: "User found", Data: user });
  } catch (error) {
    res.status(500).json({ Msg: "Server error", error: error.message });
  }
};

const updateData = async (req, res) => {
  try {
    const currentEmail = req.user?.Email;
    if (!currentEmail) return res.status(403).json({ Msg: "Unauthorized" });

    const { Name, Email } = req.body;

    const result = await User.updateOne(
      { Email: currentEmail },
      { $set: { Name, Email } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ Msg: "No updates made" });
    }

    res.status(200).json({ Msg: "User updated", Data: result });
  } catch (error) {
    res.status(500).json({ Msg: "Server error", error: error.message });
  }
};

module.exports = { AddUser, Login, GetData, updateData };
