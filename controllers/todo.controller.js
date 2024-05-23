const Todomodel = require("../models/todo.model")

const createTodo = async (req, res, next) => {
    const createdModel = await Todomodel.create(req.body)
    res.status(201).json(createdModel)
}

module.exports = { createTodo }