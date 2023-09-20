const ex = require('express');
const AdminController = require('../Controllers/AdminController');
const AdminMiddleware = require('../Middlewares/AdminMiddleware');

const admin = ex.Router();

//////////////// Middleware ////////////////

admin.use('/getAllRequests', AdminMiddleware.AdminIsAuthenticated);
admin.use('/DelteRequests', AdminMiddleware.AdminIsAuthenticated);
admin.use('/logout', AdminMiddleware.AdminIsAuthenticated);


//////////////// APIs ////////////////

admin.get('/getAllRequests', AdminController.GetAllStudentsRequests);
admin.post('/DelteRequests', AdminController.DeleteData);
admin.post('/authentication/login', AdminController.login);
admin.get('/isAuthenticated', AdminController.isAuthenticated);
admin.get('/logout', AdminController.Logout);

module.exports = admin;