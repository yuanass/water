// var http = require('http');
// var url = require('url');
// var createServer = http.createServer(onRequest);
var express = require('express');
var router = express.Router();
var app = express(); //创建web应用程序

var mysql = require('mysql');
var dbConfig = require('../db/dbconfig');
var customersql = require('../db/customersql');
// function onRequest(request, response) {
//     response.writeHead(200, {  
//         'Content-Type': 'text/plain',  
//         'Access-Control-Allow-Origin': '*'  
//     });  
//     var str = JSON.stringify(url.parse(request.url, true).query);  
//     response.write(str);  
//     response.end();
// }
// createServer.listen(8080);  
// console.log('Server running  at http://127.0.0.1:8080/');

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});