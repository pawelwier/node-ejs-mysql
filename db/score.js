const mysql = require('mysql');

var con = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : 'Wezniesql1',
    database : 'roulette'
});

module.exports.con = con;