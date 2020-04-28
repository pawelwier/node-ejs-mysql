const express = require('express');
const router = express.Router();

const controller = require('../controller/main_controller');

router.get('/', controller.getMain);
// router.post('/', controller.postMain);
router.post('/change/:id', controller.postMainParam);
router.get('/:id', controller.getUserPage);
router.post('/change', controller.postChange);
router.post('/game/:id', controller.postResult);

module.exports = router;