const ex = require('express');
const AdminController = require('../Controllers/AdminController');

const admin = ex.Router();

//////////////// Middleware ////////////////




//////////////// APIs ////////////////

admin.get('/getAllRequests', AdminController.GetAllStudentsRequests);

module.exports = admin;