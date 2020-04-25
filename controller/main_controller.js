const mysql = require('../db/score');

const con = mysql.con;

exports.getMain = async (req, res) => {

    let allResultsArray = [];
    await con.query('SELECT * FROM user_score', (err, rows) => {
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

exports.postChange = async (req, res) => {
    
    let newScore = (req.body.scoreOverwrite) ? req.body.scoreOverwrite.toString() : null;
    let nameChangeScore = (req.body.nameChangeScore) ? req.body.nameChangeScore.toString() : null;
    let deleteUser = (req.body.deleteUser) ? req.body.deleteUser.toString() : null;
    let insertUserName = (req.body.insertUserName) ? req.body.insertUserName.toString() : null;
    let insertUserScore = (req.body.insertUserScore) ? parseInt(req.body.insertUserScore) : null;
    
    let userIdUpdate, sqlQuery;

    if (insertUserName && insertUserScore) {

        let insertObject = [insertUserName, insertUserScore];

        sqlQuery = `INSERT INTO user_score (username, score) VALUES (?,?)`;
        con.query(sqlQuery, insertObject, (err, res) =>{
            if (err) throw err;
            console.log(`New user: ${insertUserName}, with score: ${insertUserScore}`);
            });
    }

    if (newScore && nameChangeScore) {
        userIdUpdate = nameChangeScore.substr(0, nameChangeScore.indexOf('.'));
        sqlQuery = `UPDATE user_score SET score = ${newScore} WHERE user_id = ${userIdUpdate}`;
        con.query(sqlQuery, (err, res) =>{
            console.log(`${newScore} set for ${nameChangeScore}`);
            });
    }

    if (deleteUser) {
        userIdUpdate = deleteUser.substr(0, deleteUser.indexOf('.'));
        sqlQuery = `DELETE FROM user_score WHERE user_id = ${userIdUpdate}`;
        con.query(sqlQuery, (err, res) => {
            console.log(`${deleteUser} deleted`)
        })
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
            res.render('main_game');
        } else {
            res.render('user_login', {
                selectedUser : row[0],
                incorrect  : true
            });
        }
    })

}