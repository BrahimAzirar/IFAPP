const ex = require('express');
const AdminController = require('../Controllers/AdminController');

const admin = ex.Router();

//////////////// Middleware ////////////////




//////////////// APIs ////////////////

admin.get('/getAllRequests', AdminController.GetAllStudentsRequests);
admin.post('/DelteRequests', AdminController.DeleteData);
admin.post('/authentication/login', AdminController.login);

module.exports = admin;