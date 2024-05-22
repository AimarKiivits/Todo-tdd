const Todomodel = require("../models/todo.model")

const createTodo = (req, res, next) => {
    const createdModel = Todomodel.create(req.body)
    res.status(201).json(createdModel)
}

module.exports = { createTodo }