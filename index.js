
'use strict'
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
var app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.listen(8080,function (){
    console.log("Servidor levantado correctamente");
});
