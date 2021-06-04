"use strict"

module.exports = class Service {
    constructor(model) {
        this.model = model
    }

    getAll = async (_, res) => {
        try {
            const data = await this.model.find()
            res.send(data)
        } catch (e) {
            res.status(500).send(e)
        }
    }
    getById = async (req, res) => {
        const id = req.params.id

        try {
            const data = await this.model.findById(id)
            if (!data) return res.sendStatus(404)
            res.send(data)
        } catch (e) {
            res.sendStatus(404)
        }
    }
    createNew = async (req, res) => {
        const data = new this.model(req.body)
        try {
            await data.save()
            res.status(201).send(data)
        } catch (e) {
            res.status(400).send(e)
        }
    }
    deleteById = async (req, res) => {
        const id = req.params.id
        try {
            const data = await this.model.findByIdAndDelete(id)
            if (!data) return res.sendStatus(404)
            res.send(data)
        } catch (e) {
            res.sendStatus(500)
        }
    }
}
