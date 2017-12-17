const mongoose = require("mongoose");

mongoose.Promise = global.Promise; //tell mongoose we want to use the promise library of the builtin
//mongoose is the library that encapsulate the mongodb
mongoose.connect("mongodb://localhost:27017/TodoApp",{useMongoClient: true});

module.exports = {mongoose};
