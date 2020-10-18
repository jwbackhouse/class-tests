const express = require('express');
const controller = require('./controller.js');
// const { param } = require('express-validator');

const router = new express.Router();

router.get('/student/:studentId', controller.studentTests_get);
router.get('/test/:testId', controller.test_get);
router.post('/test', controller.test_post);

router.get('/teacher', controller.allTests_get);
router.post('/teacher/toggle-live', controller.toggleLive_post);
router.post('/teacher/add', controller.addTest_post);


module.exports = router;
