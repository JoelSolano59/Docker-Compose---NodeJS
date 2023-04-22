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

app.post('/reg', (req, res) => {
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

	// checking user already registered or no
	connection.query(`SELECT * FROM employees EMAIL = '${EMAIL}' AND PHONE_NUMBER = '${PHONE_NUMBER}'`, function (err, result) {
		if (err) {
			res.json({
				success: false,
				err
			});
		};
		if (Object.keys(result).length > 0) {
			rres.json({
				success: false,
				err
			});
		}
		// inserting new user data
		var sql = `INSERT INTO employees (EMPLOYEE_ID, FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, HIRE_DATE, JOB_ID, SALARY, COMMISSION_PCT, MANAGER_ID, DEPARTMENT_ID) VALUES ('${EMPLOYEE_ID}', '${FIRST_NAME}', '${LAST_NAME}', '${EMAIL}', '${PHONE_NUMBER}', '${HIRE_DATE}', '${JOB_ID}', '${SALARY}', '${COMMISSION_PCT}', '${MANAGER_ID}', '${DEPARTMENT_ID}')`;
		connection.query(sql, function (err, result) {
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
});

app.listen(3000, () => console.log('Server on port 3000'));