const express = require('express');
const todoController = require('../controllers/todo.controller');
const router = express.Router();

router.post('/', todoController.createTodo);
router.get('/', todoController.getTodos);
router.get('/:todoid', todoController.getTodoById);
router.put('/:todoid', todoController.updateTodo);

module.exports = router;