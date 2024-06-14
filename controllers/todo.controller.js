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

const getTodoById = async (req, res, next) => {
    try {
        const TodoModel = await Todomodel.findById(req.params.todoid)
        if (TodoModel) {
            res.status(200).json(TodoModel)
        } else {
            res.status(404).send()
        }
    } catch (error) {
        next(error) 
    }
}

const updateTodo = async (req, res, next) => {
    try {
        const updatedTodo = await Todomodel.findByIdAndUpdate(
            req.params.todoid,
            req.body, 
            {
            new: true,
            useFindAndModify: false
            }
        );
        if (updatedTodo) {
            res.status(200).json(updatedTodo)
        } else {
            res.status(404).send()
        }
    } catch (error) {
        next(error)
    }
};

module.exports = { createTodo, getTodos, getTodoById, updateTodo}