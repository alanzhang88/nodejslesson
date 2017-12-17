const mongoose = require("mongoose");

//create a model as template for document, first is the name of model, the second is the property of model, we can configure the property
var Todo = mongoose.model('Todo',{
  text:{
    type: String, //type of the field
    required: true, //if the field is required
    minlength: 1, //minlength of the string
    trim: true //remove leading and trailing whitespaces then will check length
  },
  completed:{
    type: Boolean,
    default: false //default value of field
  },
  completedAt:{
    type: Number,
    default: null
  },
  _creator:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});
//this is a function/object constructor
//Notice type casting exist, if you enter another type that has default casting to the type, mongoose will do the cast instead of raising err

// var newTodo = new Todo({
//   text: "Cook dinner"
// });
//
// newTodo.save().then((doc)=>{
//   console.log("Saved todo",doc);
// },(e)=>{
//   console.log(e);
// });//saving to mongodb databse which returns a promise

// var newTodo = new Todo({
//   text: "Take udemy course",
//   completed: true,
//   completedAt: 3
// });
//
// newTodo.save().then((doc)=>{
//   console.log(doc);
// },(e)=>{
//   console.log(e);
// });

// var otherTodo = new Todo({
//   text: "Play PUBG"
// });
// otherTodo.save().then((doc)=>{
//   console.log(JSON.stringify(doc,undefined,2));
// },(e)=>{
//   console.log("Unable to save to database",e);
// });

module.exports = {Todo};
