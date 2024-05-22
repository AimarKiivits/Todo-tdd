const { describe } = require('node:test');
const Todocontroller = require('../../controllers/todo.controller');

describe('Todo Controller.createTodo', () => {
    it('should have a createTodo function', () => {
        expect(typeof Todocontroller.createTodo).toBe('function');
    })
})