const ex = require('express');
const cors = require('cors');
const csrf = require('csurf');
const mysql = require('mysql2');
const session = require('express-session');
const store = require('express-mysql-session')(session);

const students = require('./Routes/StudentRoutes');
const admin = require('./Routes/AdminRoutes');

const app = ex();
const options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '26022002',
	database: 'IFAPPDB'
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
app.use(cors());
app.use(csrf());
app.use(session({ 
  key: "sessionId", secret: "ldksmojs9u9283u9hwp9h;JCP9j9p8u9p8u49hfp9APAC[[ JCOIJSCJOS",
  resave: false, saveUninitialized: true, store: SessionsStore, cookie: {
    secure: true, httpOnly: true, maxAge: 604800000, sameSite: 'strict'
  }
}));

app.use('/students', students);
app.use('/admin', admin);

app.locals.mysql = connect;



app.listen(3500, console.log('Starting server ...'));