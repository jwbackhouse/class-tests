const express = require('express');
const controller = require('./controller.js');
// const { param } = require('express-validator');

const router = new express.Router();

router.get('/student/:studentId', controller.studentTests_get);
router.get('/test/:testId', controller.test_get);
router.post('/test', controller.test_post);

router.get('/teacher', controller.allTests_get);
router.post('/teacher', controller.setLive_post);
router.post('./add', controller.addTest_post);


module.exports = router;
