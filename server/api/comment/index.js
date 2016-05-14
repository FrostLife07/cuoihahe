'use strict';

var controller = require('./comment.controller');
var express = require('express');
var router = express.Router();

router.post('/', controller.addComment);
router.get('/all', controller.getAll);
router.get('/:id', controller.getComments);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
