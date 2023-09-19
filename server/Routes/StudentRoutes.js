const ex = require('express');
const StudentsController = require('../Controllers/StudentsController');
const StudentsMiddleware = require('../Middlewares/StudentsMiddleware');
const students = ex.Router();

////////////// Middlewares //////////////

students.post('/register', StudentsMiddleware.CheckEmailIsNotExist);
students.post('/register', StudentsMiddleware.CheckPhoneNumberIsExist);


////////////// APIs //////////////

students.post('/register', StudentsController.RegisterStudents);

module.exports = students;