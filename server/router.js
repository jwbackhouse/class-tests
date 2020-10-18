const express = require('express');
const controller = require('./controller.js');
// const { param } = require('express-validator');

const router = new express.Router();

router.get('/student.html', controller.student_tests_get);
router.get('/student.html/:testId', controller.test_get);
router.post('/test.html', controller.test_post);

router.get('/teacher.html', controller.all_tests_get);
router.post('/teacher.html', controller.set_live_post);
router.post('./add.html', controller.add_test_post);

module.exports = router;
