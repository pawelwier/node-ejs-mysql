const express = require('express');
const router = express.Router();

const controller = require('../controller/main_controller');

router.get('/', controller.getMain);
router.get('/:id', controller.getUserPage);
router.post('/change', controller.postChange);

module.exports = router;