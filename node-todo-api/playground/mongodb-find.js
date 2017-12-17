const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if (err){
    console.log("Unable to connect to MongoDB server");
    return;
  }
  console.log("Connect to MongoDB server");

  //access collection
  //find will return a cursor that can provide multiple functionality to navigate the database
  //the parameter given to find is an object which contains query, e.g {completed: false}
  //note the _id field is ObjectID type instead of string
  //toArray return a promise, if fulfilled, will return the array of documents
  // db.collection("Todos").find({
  //   _id: new ObjectID("5a00070faa5c9c35d1865294")
  // }).toArray().then((docs)=>{
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,2));
  // }, (err) =>{
  //   console.log('Unable to fetch todos', err);
  // });

  //count will give the number of documents that matches the query
  // db.collection("Todos").find().count().then((count)=>{
  //   console.log(`Todos count: ${count}`);
  //
  // }, (err) =>{
  //   console.log('Unable to fetch todos', err);
  // });

  db.collection("Users").find({
    name:"shuang"
  }).count().then((count)=>{
      console.log(`User Counts: ${count}`);
  },(err)=>{
    console.log("Unable to fetch Users",err);
  });

  // db.close();
});
