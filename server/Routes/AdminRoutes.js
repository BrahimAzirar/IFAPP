const ex = require('express');
const AdminController = require('../Controllers/AdminController');

const admin = ex.Router();

//////////////// Middleware ////////////////




//////////////// APIs ////////////////

admin.get('/getAllRequests', AdminController.GetAllStudentsRequests);
admin.post('/DelteRequests', AdminController.DeleteData);
admin.post('/authentication/login', AdminController.login);
admin.get('/isAuthenticated', AdminController.isAuthenticated);
admin.get('/logout', AdminController.Logout);

module.exports = admin;