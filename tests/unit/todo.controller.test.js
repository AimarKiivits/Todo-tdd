const Todocontroller = require('../../controllers/todo.controller');
const TodoModel = require('../../models/todo.model');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');
TodoModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
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
    it('should return 201 response code', () => {
        Todocontroller.createTodo(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })
    it('should return json body in response', () => {
        TodoModel.create.mockReturnValue(newTodo);
        Todocontroller.createTodo(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    })
})

