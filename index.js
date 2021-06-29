'use strict'
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require('mysql2');
var app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.listen(8080,function (){
    console.log("Servidor levantado correctamente");
});

var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"lab10_employees"
});

connection.connect(function (error) {
    if(error){
        console.log(error);
    }else{
        console.log("Conexion correcta a BD");
    }
});


// P1

app.get("/empleados/get",function (request,response) {
    var query = "select e.EmployeeID, e.LastName, e.FirstName, e.Title from employees e";
    connection.query(query,function (error,result) {
        if(error){
            console.log(error);
        }else{
            response.json(result);
        }
    });
});
