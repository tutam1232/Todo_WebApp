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

Route.get('/gettodos', 'TodoController.getTodos');
Route.post('/addtodo', 'TodoController.addTodo');
Route.put('/updatetodo/:id', 'TodoController.updateTodo');
Route.delete('/deletetodo/:id', 'TodoController.deleteTodo');

Route.get('/getblogs', 'BlogController.getBlogs');
Route.get('/getblogs/:id', 'BlogController.getBlog');
