const express = require("express");
const router = express.Router();
const { AddUser, Login, GetData, updateData } = require("../Controller/User");
const verifyToken = require("../Middleware/Auth");

router.post("/register", AddUser);

router.post("/login", Login);

router.get("/me", verifyToken, GetData);

router.put("/update", verifyToken, updateData);

module.exports = router;
