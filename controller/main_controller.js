const mysql = require('../db/score');

const con = mysql.con;

exports.getMain = (req, res) => {

    let allResultsArray = [];
    con.query('SELECT * FROM user_score', (err, rows) => {
        if (err) throw err;

        for (var i = 0; i < rows.length; i++) {
            allResultsArray.push({
                user_id : rows[i].user_id,
                username : rows[i].username,
                score : rows[i].score
            })
        }

        res.render('index', {
            userScoreArray : allResultsArray
        });
    });

}

function changePassFunction(user, pass) {
    let userIdUpdate = user.substr(0, user.indexOf('.'));
        sqlQuery = `UPDATE user_score SET password = ${pass} WHERE user_id = ${userIdUpdate}`;
        con.query(sqlQuery, (err, res) => {
            console.log(`Pass for ${userIdUpdate} changed to ${pass}`)
        })
}

function deleteUserFunction(user) {
    let userIdUpdate = user.substr(0, user.indexOf('.'));
    let sqlQuery = `DELETE FROM user_score WHERE user_id = ${userIdUpdate}`;
    con.query(sqlQuery, (err, res) => {
        console.log(`${user} deleted`)
    })
}

function changeScoreFunction(user, score) {
    let userIdUpdate = user.substr(0, user.indexOf('.'));
    let sqlQuery = `UPDATE user_score SET score = ${parseInt(score)} WHERE user_id = ${parseInt(userIdUpdate)}`;
    con.query(sqlQuery, (err, res) =>{
        console.log(`${score} set for ${user}`);
    });
}

function newUserFunction(user, score) {
    let insertObject = [user, parseInt(score), 1234];

    let sqlQuery = `INSERT INTO user_score (username, score, password) VALUES (?,?,?)`;
    con.query(sqlQuery, insertObject, (err, res) =>{
        if (err) throw err;
            console.log(`New user: ${user}, with score: ${score}`);
        });
}

exports.postChange = async (req, res) => {
    console.log('x')
    
    let newScore = (req.body.scoreOverwrite) ? req.body.scoreOverwrite.toString() : null;
    let nameChangeScore = (req.body.nameChangeScore) ? req.body.nameChangeScore.toString() : null;
    let deleteUser = (req.body.deleteUser) ? req.body.deleteUser.toString() : null;
    let insertUserName = (req.body.insertUserName) ? req.body.insertUserName.toString() : null;
    let insertUserScore = (req.body.insertUserScore) ? parseInt(req.body.insertUserScore) : null;
    let changePassword = (req.body.changePassword) ? req.body.changePassword.toString() : null;
    let newPassword = (req.body.newPassword) ? req.body.newPassword.toString() : null;
    
    if (insertUserName && insertUserScore) {
        newUserFunction(insertUserName, insertUserScore);
    }

    if (nameChangeScore && newScore) {
        changeScoreFunction(nameChangeScore, newScore);
    }

    if (deleteUser) {
        deleteUserFunction(deleteUser);
    }

    if (changePassword && newPassword) {
        changePassFunction(changePassword, newPassword);
    }
    
    res.render('change' );

}

exports.getUserPage = (req, res) => {
    sqlQuery = `SELECT * FROM user_score WHERE user_id=${req.params.id}`;

    con.query(sqlQuery, (err, row) => {
        res.render('user_login', {
            selectedUser : row[0],
            incorrect  : false
        });
    })   
}

function Field (val, col) {
    this.val = val;
    this.col = col;
};

var fieldArr = [field0 = new Field(), field1 = new Field(), field2 = new Field(), field3 = new Field(), field4 = new Field(), field5 = new Field(),
field6 = new Field(), field7 = new Field(), field8 = new Field(), field9 = new Field(), field10 = new Field(), field11 = new Field(), 
field12 = new Field(), field13 = new Field(), field14 = new Field(), field15 = new Field(), field16 = new Field(), field17 = new Field(),
field18 = new Field(), field19 = new Field(), field20 = new Field(), field21 = new Field(), field22 = new Field(), field23 = new Field(),
field24 = new Field(), field25 = new Field(), field26 = new Field(), field27 = new Field(), field28 = new Field(), field29 = new Field(),
field30 = new Field(), field31 = new Field(), field32 = new Field(), field33 = new Field(), field34 = new Field(), field35 = new Field(), 
field36 = new Field()];

var redFields = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

var arrNumbers = [];
var arrColors = [];

for (var i = 0; i < fieldArr.length; i++) {
    fieldArr[i].val = i;
    arrNumbers.push(i);
    fieldArr[i].col = i == 0 ? "green" : (redFields.includes(i) ? "red" : "black");
    arrColors.push(fieldArr[i].col);
}

var arrColumnSelect = [];
var countColumn = 1;
while (countColumn < 13) {
    arrColumnSelect.push({
        index : countColumn,
        val : "kolumna " + countColumn
    });
    countColumn++;
}

exports.postResult = (req, res) => {
    sqlQuery = `SELECT * FROM user_score WHERE user_id=${req.params.id}`;

    con.query(sqlQuery, (err, row) => {
        let isPassCorrect = req.body.pass === row[0].password ? true : false;
        if (isPassCorrect) {

            res.render('main_game', {
                fieldArr : fieldArr,
                arrNumbers : arrNumbers,
                arrColors : arrColors,
                arrColumnSelect : arrColumnSelect,
                userName : row[0].username,
                userCredit : row[0].score,
                userId : row[0].user_id
                
            });
        } else {
            res.render('user_login', {
                selectedUser : row[0],
                incorrect  : true
            });
        }
    })

}

exports.postMainParam = (req, res) => {
    console.log('y')
    console.log(req.body.finalCredit);

    if (!req.body.finalCredit) {
        res.render('change');
        return;
    }

    let sqlQuery = `UPDATE user_score SET score = ${parseInt(req.body.finalCredit)} WHERE user_id = ${parseInt(req.params.id)}`;
    con.query(sqlQuery, (err, res) =>{
        console.log(`${req.body.finalCredit} set for ${req.params.id}`);
    });


    res.render('change')

}