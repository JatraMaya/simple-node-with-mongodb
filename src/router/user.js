const express = require("express")
const router = new express.Router()
const Service = require("../service/userService")
const User = require("../models/user")
const service = new Service(User)

router.get("/users", service.getAll)
router.get("/users/:id", service.getById)
router.post("/users", service.createNew)
router.post("/users/login", service.login)
router.patch("/users/:id", service.editProfile)
router.delete("/users/:id", service.deleteById)

module.exports = router
