const express = require('express');
const controller = require('./controller.js');
const { param, body } = require('express-validator');

const router = new express.Router();

// NB testIds must be alphanumeric
// studentIds must be numeric
const titleRegex = '^[\s-_0-9A-Za-z]*$';

router.get('/student/:studentId', [
    param('studentId')
        .exists()
        .escape()
        .isNumeric()
    ], controller.studentTests_get);

router.post('/student/:studentId/:testId', [
    param('studentId')
        .exists()
        .escape()
        .isNumeric(),
    param('testId')
        .exists()
        .escape()
        .isAlphanumeric(),
    body('answers')
        .exists()
        .escape()
        .isArray()
    ], controller.test_post);

router.get('/test/:testId', [
    param('testId')
        .exists()
        .escape()
        .isAlphanumeric()
    ], controller.test_get);

router.get('/teacher', controller.allTests_get);

router.post('/teacher/toggle-live', [
    body('testId')
        .exists()
        .escape()
        .isAlphanumeric()
    ], controller.toggleLive_post);

router.post('/teacher/add',[
    body('title')
            .trim()
        .exists()
        .escape(),
        // .matches(titleRegex),
    body('questions')
        .exists(),
        // .isArray(),
    body('live')
        .exists()
        .isBoolean()
    ], controller.addTest_post);


module.exports = router;
