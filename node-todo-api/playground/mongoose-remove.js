const {mongoose} = require("../server/db/mongoose.js");
const {Todo} = require("../server/models/todo.js");
const {User} = require("../server/models/user.js");
const {ObjectID} = require('mongodb');

//mongoose to delete api
//Todo.remove({}) remove all the matches

//remove all the entries in the Todo collections and return the result(contians the numbers that removed)
Todo.remove({}).then((res)=>{
  console.log(res);
});

//match the first and remove it, return the removed data
Todo.findOneAndRemove({}).then((doc)=>{
  console.log(doc)
})

//remove the one with the id
Todo.findByIdAndRemove().then((doc)=>{
  console.log(doc)
})
