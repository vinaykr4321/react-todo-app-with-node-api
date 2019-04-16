const mongoose = require('mongoose');
mongoose.set("debug", true);
mongoose.connect("mongodb+srv://node_api:node_api@node-todos-api-cluster-jhwiq.mongodb.net/todo_api?retryWrites=true",{useNewUrlParser: true});


mongoose.Promise = Promise;

module.exports.Todo = require('./todo');