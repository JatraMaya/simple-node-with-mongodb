"use strict"

const Service = require("./service")

module.exports = class TaskService extends (
    Service
) {
    constructor(model) {
        super(model)
        this.model = model
    }

    editTask = async (req, res) => {
        const updates = Object.keys(req.body)
        const modelParams = ["description", "completed"]
        const updateIsValid = updates.every((update) => modelParams.includes(update))

        if (!updateIsValid) return res.sendStatus(400)

        try {
            const task = await this.model.findByIdAndUpdate(req.params.id)
            updates.forEach((update) => (task[update] = req.body[update]))
            task.save()

            if (!task) return res.sendStatus(400)
            res.send(task)
        } catch (e) {
            res.sendStatus(400)
        }
    }
}
