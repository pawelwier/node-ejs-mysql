const mysql = require('mysql');

var con = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : 'Wezniesql1',
    database : 'roulette'
});

con.connect((err) => {
    if (err) throw err;
    console.log("DB connected");
});