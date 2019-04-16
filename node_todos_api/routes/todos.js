const express = require('express');
const router = express.Router();
const db = require('../models/index');
const helpers = require('../helpers/todos');

router.route('/')
.get(helpers.getTodos)
.post(helpers.createTodo);


router.get('/:todoId',helpers.getTodo);

router.put('/:todoId',helpers.updateTodo);

router.delete('/:todoId',helpers.deleteTodo);

module.exports = router;