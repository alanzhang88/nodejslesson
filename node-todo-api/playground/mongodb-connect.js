//const MongoClient = require('mongodb').MongoClient;
// const {MongoClient} = require('mongodb'); //exactly identical to above
//destructure by using curly brackets to wrap the fields and we create a variable call MongoClient with value equal to the one in the object require('mongodb')
const {MongoClient, ObjectID} = require("mongodb");

// generate unique ID
// var obj = new ObjectID();
// console.log(obj);

//mongodb:// means to use mongodb protocl and we use local server so we put localhost and port number
//the last one is the database we want to access, inhere is TodoApp
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if (err){
    console.log("Unable to connect to MongoDB server");
    return;
  }
  console.log("Connect to MongoDB server");
  //create a collection which is named Todos and insertOne will insert the element
  // db.collection("Todos").insertOne({
  //   text: "Something to do",
  //   completed: false
  // }, (err, result) => {
  //     if (err){
  //       return console.log("Unable to insert todo", err);
  //     }
  //     //all the docs(entries) we insert by result.ops
  //     console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  //the _id generated by database encodes timestamp, machine name, random generated string, counter
  //all of these make sure that id is unique
  //we can overide this too with one we give them
  // db.collection("Users").insertOne({
  //   name: "buLLDozER",
  //   age: 22,
  //   location: "UCLA"
  // },(err,result)=>{
  //   if(err){
  //     return console.log("Unable to add user");
  //   }
  //   //we can retrieve timestamp from default id using getTimestamp function
  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  

  db.close();
});
