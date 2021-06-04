const express = require("express")
const router = new express.Router()
const Task = require("../models/task")
const Service = require("../service/taskService")

const service = new Service(Task)

router.get("/tasks", service.getAll)
router.get("/tasks/:id", service.getById)
router.post("/tasks", service.createNew)
router.patch("/tasks/:id", service.editTask)
router.delete("/tasks/:id", service.deleteById)

module.exports = router
