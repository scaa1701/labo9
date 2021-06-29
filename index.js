'use strict'
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql2');
var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.listen(8080, function () {
    console.log("Servidor levantado correctamente");
});

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "lab10_employees",
    port: "3306"
});

connection.connect(function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("Conexion correcta a BD");
    }
});

// P1
app.get("/empleados/get", function (request, response) {
    var query = "select e.EmployeeID, e.LastName, e.FirstName, e.Title from employees e";
    connection.query(query, function (error, result) {
        if (error) {
            console.log(error);
        } else {

            for (let i = 0; i < result.length; i++) {
                result[i].orden = i + 1;
            }

            response.json(result);
        }
    });
});

//P2
app.get("/empleados/getManagerEmployees/:id", function (request, response) {
    var id = request.params.id;
    var query = "select e.EmployeeID, e.LastName, e.FirstName, e.Title from employees e inner join employees j on (e.ReportsTo=j.EmployeeID) where j.EmployeeID = ?";
    connection.query(query, [id], function (error, result) {
        if (error) {
            console.log(error);
        } else {
            response.json(result);
        }
    });
});

//P3
app.get("/empleados/get/:id", function (request, response) {
    var id = request.params.id;
    var query = " select * from employees e where e.Title like ?";
    connection.query(query, [id], function (error, result) {
        if (error) {
            console.log(error);
        } else {
            response.json(result);
        }
    });
});

//P4
app.post("/empleados/update", function (request, response) {
    let id = request.body.employeeid;
    let email = request.body.email;
    let address = request.body.address;
    var query1 = "update employees e set e.Email = ? where e.EmployeeID = ?";
    var query2 = "update employees e set e.Address = ? where e.EmployeeID= ?";
    var query3 = "update employees e set e.Email = ? and e.Address where EmployeeID= ?";
    if (email !== '' && address !== ''){
        let parametros = [email, address, id];
        connection.query(query3, parametros, function (error, result) {
            if (error) {
                response.json({ status: 'error', message: error.message})
            } else {
                response.json({ status: 'ok', message: 'Employee updated'})
            }
        });
    }else if(email !== '' && address === ''){
        let parametros = [email, id];
        connection.query(query1, parametros, function (error, result) {
            if (error) {
                response.json({ status: 'error', message: error.message})
            } else {
                response.json({ status: 'ok', message: 'Employee updated'})
            }
        });
    }else if(email === '' && address !== ''){
        let parametros = [address, id];
        connection.query(query2, parametros, function (error, result) {
            if (error) {
                response.json({ status: 'error', message: error.message})
            } else {
                response.json({ status: 'ok', message: 'Employee updated'})
            }
        });
    }
});

//P5
app.get("/productos/get", function (request, response) {
    let page = request.query.page;
    let size = 10;
    let pagequery = size * page - size;
    var query = "select ProductID, ProductName, UnitPrice, UnitsInStock from products p limit ?, ?";
    let parametros = [pagequery, size];

    connection.query(query, parametros, function (error, result) {
        if (error) {
            console.log(error);
        }else{
            response.json(result);
        }
    });
});
