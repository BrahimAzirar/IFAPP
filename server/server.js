const ex = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const students = require('./Routes/StudentRoutes');

const app = ex();
const options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '26022002',
	database: 'IFAPPDB'
};

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

app.use('/students', students);

app.locals.mysql = connect;



app.listen(3500, console.log('Starting server ...'));