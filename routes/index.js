var express = require('express');
var router = express.Router();

// var controller = require('../controllers/main_game');

router.get('/', (req, res) => {
    res.render('index');
})

module.exports = router;