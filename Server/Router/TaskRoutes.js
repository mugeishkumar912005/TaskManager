const express = require("express");
const router = express.Router();
const userAuth = require("../MiddleWare/Auth");
const { AddTask, GetTasks, UpdateTask, DeleteTask, Lapsed, Pending, Completed } = require("../Controller/TaskController");
const { route } = require("./UserRoutes");

router.post("/add", userAuth, AddTask);
router.get("/all", userAuth, GetTasks);
router.put("/update/:id", userAuth, UpdateTask);
router.delete("/delete/:id", userAuth, DeleteTask);
router.get("/la",userAuth,Lapsed);
router.get("/pn",userAuth,Pending);
router.get("/cp",userAuth,Completed);

module.exports = router;
