const Todocontroller = require('../../controllers/todo.controller');
const TodoModel = require('../../models/todo.model');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');
const allTodos = require('../mock-data/all-todos.json');

TodoModel.create = jest.fn();
TodoModel.find = jest.fn();
TodoModel.findById = jest.fn();
TodoModel.findByIdAndUpdate = jest.fn();

const todoId = "664f1ecae3ce4773effcd30e";

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

describe('Todo Controller.getTodos', () => {
    it('should have a getTodos function', () => {
        expect(typeof Todocontroller.getTodos).toBe('function');
    })
    it('should call TodoModel.find({})', async () => {
        await Todocontroller.getTodos(req, res, next);
        expect(TodoModel.find).toHaveBeenCalledWith({});
    })
    it('should return response with status 200 and all todos', async () => {
        TodoModel.find.mockReturnValue(allTodos);
        await Todocontroller.getTodos(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allTodos);
    })
    it('should handle errors in getTodos', async () => {
        const errorMessage = { message: 'Error finding' };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.find.mockReturnValue(rejectedPromise);
        await Todocontroller.getTodos(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    })
})

describe("Todo Controller.getTodoById", () => {
    it("should have a getTodoById", () => {
        expect(typeof Todocontroller.getTodoById).toBe("function");
    })
    it("should call TodoModel.findById", async () => {
        req.params.todoId = "664f1ecae3ce4773effcd30e";
        await Todocontroller.getTodoById(req, res, next);
        expect(TodoModel.findById).toBeCalledWith("664f1ecae3ce4773effcd30e");
    })
    it("should return json body and response code 200", async () => {
        TodoModel.findById.mockReturnValue(newTodo);
        await Todocontroller.getTodoById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newTodo);
        expect(res._isEndCalled()).toBeTruthy();
    })
    it("should do error handling", async() => {
        const errorMessage = { message: "Error finding todoModel" };
        const rejectedPromise = Promise.reject(errorMessage)
        Todomodel.findById.mockReturnValue(rejectedPromise);
        await Todocontroller.getTodoById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    })
    it("should return 404 when item doesn't exist", async () => {
        Todomodel.findById.mockReturnValue(null);
        await Todocontroller.getTodoById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    })
})

describe("Todo Controller.updateTodo", () => {
    it("should have an updateTodo function", () => {
        expect(typeof Todocontroller.updateTodo).toBe("function");
    })
    it("should update with TodoModel.findByIdAndUpdate", async () => {
        req.params.todoId = todoId;
        req.body = newTodo;
        await Todocontroller.updateTodo(req, res, next);
        expect(Todomodel.findByIdAndUpdate).toHaveBeenCalledWith(todoId, newTodo, {
            new: true,
            useFindAndModify: false
        })
    })
    it("should return a response with json data and http code 200", async () => {
        req.params.todoId = todoId;
        req.body = newTodo;
        Todomodel.findByIdAndUpdate.mockReturnValue(newTodo);
        await Todocontroller.updateTodo(req, res, next);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    })
    it("should handle errors", async () => {
        const errorMessage = { message: "Error" };
        const rejectedPromise = Promise.reject(errorMessage);
        Todomodel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await Todocontroller.updateTodo(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    })
    it("should handle 404", async () => {
        Todomodel.findByIdAndUpdate.mockReturnValue(null);
        await Todocontroller.updateTodo(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    })
})
