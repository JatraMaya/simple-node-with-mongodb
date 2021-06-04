"use strict"

const Service = require("./service")

module.exports = class UserService extends (
    Service
) {
    constructor(model) {
        super(model)
        this.model = model
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await this.model.findByCredentials(email, password)
            if (!user) return res.status(400).send({ error: "Unable to login." })
            res.send(user)
        } catch (e) {
            res.status(400).send({ error: "Unable to login." })
        }
    }
    editProfile = async (req, res) => {
        const updates = Object.keys(req.body)
        const modelParams = ["name", "email", "password", "age"]
        const updateIsValid = updates.every((update) => modelParams.includes(update))

        if (!updateIsValid) return res.sendStatus(400)
        try {
            const user = await this.model.findByIdAndUpdate(req.params.id)
            updates.forEach((update) => (user[update] = req.body[update]))
            await user.save()
            if (!user) return res.sendStatus(400)
            res.send(user)
        } catch (e) {
            res.sendStatus(400)
        }
    }
}
