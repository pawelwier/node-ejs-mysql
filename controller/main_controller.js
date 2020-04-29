const mysql = require('../db/score');
const board = require('../data/board');
const util = require('../data/util')

const con = mysql.con;

const { arrNumbers, arrColors, arrColumnSelect, fieldArr } = board;

const { changePassFunction, changeScoreFunction, deleteUserFunction, newUserFunction } = util;

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

// function changePassFunction(user, pass) {
//     let userIdUpdate = user.substr(0, user.indexOf('.'));
//     let sqlQuery = `UPDATE user_score SET password = ${pass} WHERE user_id = ${userIdUpdate}`;
//     con.query(sqlQuery, (err, res) => {
//         console.log(`Pass for ${userIdUpdate} changed to ${pass}`)
//     })
// }

// function deleteUserFunction(user) {
//     let userIdUpdate = user.substr(0, user.indexOf('.'));
//     let sqlQuery = `DELETE FROM user_score WHERE user_id = ${userIdUpdate}`;
//     con.query(sqlQuery, (err, res) => {
//         console.log(`${user} deleted`)
//     })
// }

// function changeScoreFunction(user, score) {
//     let userIdUpdate = user.substr(0, user.indexOf('.'));
//     let sqlQuery = `UPDATE user_score SET score = ${parseInt(score)} WHERE user_id = ${parseInt(userIdUpdate)}`;
//     con.query(sqlQuery, (err, res) =>{
//         console.log(`${score} set for ${user}`);
//     });
// }

// function newUserFunction(user, score) {
//     let insertObject = [user, parseInt(score), 1234];

//     let sqlQuery = `INSERT INTO user_score (username, score, password) VALUES (?,?,?)`;
//     con.query(sqlQuery, insertObject, (err, res) =>{
//         if (err) throw err;
//             console.log(`New user: ${user}, with score: ${score}`);
//         });
// }

exports.postChange = async (req, res) => {
    let newScore = (req.body.scoreOverwrite) ? req.body.scoreOverwrite.toString() : null;
    let nameChangeScore = (req.body.nameChangeScore) ? req.body.nameChangeScore.toString() : null;
    let deleteUser = (req.body.deleteUser) ? req.body.deleteUser.toString() : null;
    let insertUserName = (req.body.insertUserName) ? req.body.insertUserName.toString() : null;
    let insertUserScore = (req.body.insertUserScore) ? parseInt(req.body.insertUserScore) : null;
    let changePassword = (req.body.changePassword) ? req.body.changePassword.toString() : null;
    let newPassword = (req.body.newPassword) ? req.body.newPassword.toString() : null;
    
    if (insertUserName && insertUserScore) {
        newUserFunction(insertUserName, insertUserScore, con);
    }

    if (nameChangeScore && newScore) {
        changeScoreFunction(nameChangeScore, newScore, con);
    }

    if (deleteUser) {
        deleteUserFunction(deleteUser, con);
    }

    if (changePassword && newPassword) {
        changePassFunction(changePassword, newPassword, con);
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