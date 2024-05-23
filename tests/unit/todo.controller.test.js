const Todocontroller = require('../../controllers/todo.controller');
const TodoModel = require('../../models/todo.model');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');
TodoModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})

describe('Todo Controller.createTodo', () => {
    beforeEach(() => {
        req.body = newTodo;
    })
    it('should have a createTodo function', () => {
        expect(typeof Todocontroller.createTodo).toBe('function');
    })
    it('should call Todomodel.create', () => {
        req.body = newTodo;
        Todocontroller.createTodo(req, res, next);
        expect(TodoModel.create).toBeCalledWith(newTodo);
    })
    it('should return 201 response code', async () => {
        await Todocontroller.createTodo(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })
    it('should return json body in response', async () => {
        await TodoModel.create.mockReturnValue(newTodo);
        await Todocontroller.createTodo(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    })
    it('should handle errors', async () => {
        const errorMessage = { message: 'Done property missing' };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.create.mockReturnValue(rejectedPromise);
        await Todocontroller.createTodo(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    })
})

