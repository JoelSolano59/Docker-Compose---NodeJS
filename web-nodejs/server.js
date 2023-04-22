const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createPool({
	host: process.env.MYSQL_HOST || 'localhost',
	user: process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PASSWORD || 'itesm',
	database: process.env.MYSQL_DATABASE || 'test_database'
});

app.get('/', (req, res) => {

	connection.query('SELECT * FROM employees', (err, rows) => {
		if (err) {
			res.json({
				success: false,
				err
			});
		}

		else {
			res.json({
				success: true,
				rows
			});
		}
	});
});

app.post('/signup', (req, res) => {
	var EMPLOYEE_ID = 0;
	var FIRST_NAME = 'Joel';
	var LAST_NAME = 'Isaias';
	var EMAIL = 'a01639289@tec.mx';
	var PHONE_NUMBER = '1234567890';
	var HIRE_DATE = '2000-03-30';
	var JOB_ID = 'IT_PROG';
	var SALARY = 10000;
	var COMMISSION_PCT = 0.1;
	var MANAGER_ID = 100;
	var DEPARTMENT_ID = 90;

	con.connect(function (err) {
		if (err) {
			console.log(err);
		}
		// checking user already registered or no
		con.query(`SELECT * FROM employees EMAIL = '${EMAIL}' AND PHONE_NUMBER = '${PHONE_NUMBER}'`, function (err, result) {
			if (err) {
				console.log(err);
			};
			if (Object.keys(result).length > 0) {
				res.sendFile(__dirname + '/');
			} else {
				//creating user page in userPage function
				function userPage() {
					res.send(`
								<!DOCTYPE html>
								<html lang="en">
								<head>
										<title>Docker-nodejs-mysql</title>
										<meta charset="UTF-8">
										<meta name="viewport" content="width=device-width, initial-scale=1">
										<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
								</head>
								<body>
										<div class="container">
												<h3>Sign up succesfully!</h3>
										</div>
								</body>
								</html>
								`);
				}
			}
			// inserting new user data
			var sql = `INSERT INTO employees (EMPLOYEE_ID, FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, HIRE_DATE, JOB_ID, SALARY, COMMISSION_PCT, MANAGER_ID, DEPARTMENT_ID) VALUES ('${EMPLOYEE_ID}', '${FIRST_NAME}', '${LAST_NAME}', '${EMAIL}', '${PHONE_NUMBER}', '${HIRE_DATE}', '${JOB_ID}', '${SALARY}', '${COMMISSION_PCT}', '${MANAGER_ID}', '${DEPARTMENT_ID}')`;
			con.query(sql, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					// using userPage function for creating user page
					userPage();
				}
			});
		});
	});
});

app.listen(3000, () => console.log('Server on port 3000'));