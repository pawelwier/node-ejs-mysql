function changePassFunction(user, pass, connection) {
    let userIdUpdate = user.substr(0, user.indexOf('.'));
    let sqlQuery = `UPDATE user_score SET password = ${pass} WHERE user_id = ${userIdUpdate}`;
    connection.query(sqlQuery, (err, res) => {
        console.log(`Pass for ${userIdUpdate} changed to ${pass}`)
    })
}

function deleteUserFunction(user, connection) {
    let userIdUpdate = user.substr(0, user.indexOf('.'));
    let sqlQuery = `DELETE FROM user_score WHERE user_id = ${userIdUpdate}`;
    connection.query(sqlQuery, (err, res) => {
        console.log(`${user} deleted`)
    })
}

function changeScoreFunction(user, score, connection) {
    let userIdUpdate = user.substr(0, user.indexOf('.'));
    let sqlQuery = `UPDATE user_score SET score = ${parseInt(score)} WHERE user_id = ${parseInt(userIdUpdate)}`;
    connection.query(sqlQuery, (err, res) =>{
        console.log(`${score} set for ${user}`);
    });
}

function newUserFunction(user, score, connection) {
    let insertObject = [user, parseInt(score), 1234];

    let sqlQuery = `INSERT INTO user_score (username, score, password) VALUES (?,?,?)`;
    connection.query(sqlQuery, insertObject, (err, res) =>{
        if (err) throw err;
            console.log(`New user: ${user}, with score: ${score}`);
        });
}

exports.changePassFunction = changePassFunction;
exports.changeScoreFunction = changeScoreFunction;
exports.deleteUserFunction = deleteUserFunction;
exports.newUserFunction = newUserFunction;