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
    // let nameHundred = (req.body.addHundredScore) ? req.body.addHundredScore.toString() : null;
    
    let post = {
            username : 'Pawel',
            score : newScore
        };

    if (newScore && nameChangeScore) {
        let userIdUpdate = nameChangeScore.charAt(0);
        let sqlQuery = `UPDATE user_score SET score = ${newScore} WHERE user_id = ${userIdUpdate}`;
        con.query(sqlQuery, (err, res) =>{
            console.log(`${newScore} set for ${nameChangeScore}`);
            });
        }
    
        res.render('change' );

}