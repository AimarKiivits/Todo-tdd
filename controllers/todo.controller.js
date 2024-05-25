const Todomodel = require("../models/todo.model")

const createTodo = async (req, res, next) => {
    try {
        const createdModel = await Todomodel.create(req.body)
        res.status(201).json(createdModel)
    } catch(error){
        next(error)
    }
}

const getTodos = async (req, res, next) => {
    const allTodos = await Todomodel.find({})
    res.status(200).json(allTodos)
}

module.exports = { createTodo, getTodos}