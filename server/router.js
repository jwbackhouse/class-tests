const express = require('express');
const controller = require('./controller.js');
const { param, body } = require('express-validator');

const router = new express.Router();

const testIdRegex = /[0-9A-Za-z]*$/;
const studentIdRegex = /[0-9]*$/;
const titleRegex = /^[\s-0-9A-Za-z]*$/;

router.get('/student/:studentId', [
    param('studentId')
        .exists()
        .escape()
        .matches(studentIdRegex)
    ], controller.studentTests_get);

router.post('/student/:studentId/:testId', [
    param('studentId')
        .exists()
        .escape()
        .matches(studentIdRegex),
    param('testId')
        .exists()
        .escape()
        .matches(testIdRegex),
    body('answers')
        .exists()
        .isArray()
    ], controller.test_post);

router.get('/test/:testId', [
    param('testId')
        .exists()
        .escape()
        .matches(testIdRegex)
    ], controller.test_get);

router.get('/teacher', controller.allTests_get);

router.post('/teacher/toggle-live', [
    body('testId')
        .exists()
        .escape()
        .matches(testIdRegex)
    ], controller.toggleLive_post);

router.post('/teacher/add',[
    body('title')
            .trim()
        .exists()
        .matches(titleRegex),
    body('questions')
        .exists()
        .isArray(),
    body('live')
        .exists()
        .isBoolean()
    ], controller.addTest_post);


module.exports = router;
