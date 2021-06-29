'use strict'
const express = require("express");
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
    database:"lab10_employees",
    port: "3306"
});

connection.connect(function (error) {
    if(error){
        console.log(error);
    }else{
        console.log("Conexion correcta a BD");
    }
});

// P1
app.get("/empleados/get",function (request, response) {
    var query = "select e.EmployeeID, e.LastName, e.FirstName, e.Title from employees e";
    connection.query(query,function (error,result) {
        if(error){
            console.log(error);
        }else{

            for (let i=0; i<result.length; i++){
                result[i].orden=i+1;
            }

            response.json(result);
        }
    });
});

//P2
app.get("/empleados/getManagerEmployees/:id",function (request,response) {
    var id = request.params.id;
    var query = "select e.EmployeeID, e.LastName, e.FirstName, e.Title\n" +
        "from employees e\n" +
        "inner join employees j on (e.ReportsTo=j.EmployeeID)\n" +
        "where j.EmployeeID = ?";
    connection.query(query,[id],function (error,result) {
        if(error){
            console.log(error);
        }else{
            response.json(result);
        }
    });
});





