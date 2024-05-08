'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// public routes
Route.post('/register', 'UserController.register');
Route.post('/login', 'UserController.login');

// protected routes
Route.group(() => {
    Route.get('/gettodos/:id', 'TodoController.getTodosByUser')  
    Route.get('/gettodos', 'TodoController.getTodos');
    Route.post('/addtodo', 'TodoController.addTodo');
    Route.put('/updatetodo/:id', 'TodoController.updateTodo');
    Route.delete('/deletetodo/:id', 'TodoController.deleteTodo');
    Route.put('/reorder/:id1/:id2', 'TodoController.reorderTodo');

    Route.get('/getblogs', 'BlogController.getBlogs');
    Route.get('/getblogs/:id', 'BlogController.getBlog');


    Route.get('/getusers', 'UserController.getUsers'); 
    Route.get('/getuser/:id', 'UserController.getUser'); 

    Route.get('/getroles', 'RoleController.getRoles'); 

    Route.post('/adduser', 'UserController.addUser').middleware(['verifyAdmin']); 
    Route.put('/updateuser/:id', 'UserController.updateUser').middleware(['verifyAdmin']);
    Route.delete('/deleteuser/:id', 'UserController.deleteUser').middleware(['verifyAdmin']);

    //TODO: move hash password to model using Lucid hooks

}).middleware(['auth:jwt', 'verifyToken'])
