const {mongoose} = require("../server/db/mongoose.js");
const {Todo} = require("../server/models/todo.js");
const {User} = require("../server/models/user.js");
const {ObjectID} = require('mongodb');

// var id = "5a01577e19b4293cdf8545e1";
//
// if(!ObjectID.isValid(id)){
//   console.log("ID not valid");
// }
//
// Todo.find({
//   _id : id //mongoose help you convert to ObjectID
// }).then((todos)=>{
//   //getting an array
//   console.log("Todos ", todos);
// });
//
// Todo.findOne({
//   _id : id //mongoose help you convert to ObjectID
// }).then((todo)=>{
//   //getting a json
//   console.log("Todo ", todo);
// });

//save us from creating json
// Todo.findById(id).then((todo)=>{
//   if(!todo){
//     return console.log("ID not found");
//   }
//   console.log("TodoById ",todo);
// }).catch((e)=>console.log(e));

var userId = "5a01554c0d40b43cd2143eb5";

User.findById(userId).then((todo)=>{
  if(!todo){
    return console.log("ID not found");
  }
  console.log(todo);
}).catch((e)=>console.log(e));
