const ex = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const session = require('express-session');
const store = require('express-mysql-session')(session);
require('dotenv').config();

const students = require('./Routes/StudentRoutes');
const admin = require('./Routes/AdminRoutes');

const app = ex();
const options = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE
};

const SessionsStore = new store(options);

const connect = mysql.createConnection(options); 
connect.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the MySQL database :)');
});

app.use(ex.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(session({ 
  key: "ref", secret: "ldksmojs9u9283u9hwp9h;JCP9j9p8u9p8u49hfp9APAC[[ JCOIJSCJOS",
  resave: false, saveUninitialized: false, store: SessionsStore, cookie: {
    secure: true, httpOnly: true, maxAge: 1814400000, sameSite: 'strict'
  }
}));

app.use('/students', students);
app.use('/admin', admin);

app.locals.mysql = connect;


app.listen(3500, console.log('http://localhost:3500'));