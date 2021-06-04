const router = require("express").Router()

router.get("", (_, res) => {
    res.status(200).json({message: "OK"})
})

module.exports = router
