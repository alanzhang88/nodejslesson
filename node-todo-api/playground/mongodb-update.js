const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if (err){
    console.log("Unable to connect to MongoDB server");
    return;
  }
  console.log("Connect to MongoDB server");

  //findOneAndUpdate find one and update the document and get that document back
  // db.collection("Todos").findOneAndUpdate({
  //   _id : new ObjectID("5a0137aac26468462b10118e")
  // },{ //here we must use the operation in the documentation
  //     $set:{
  //       completed: true
  //     }
  //   },{
  //     returnOriginal: false //this option is default to true where return the original doc, false will return the revised one
  //   }).then((result)=>{
  //     console.log(result);
  //   });

  db.collection("Users").findOneAndUpdate({
    _id: new ObjectID("5a0008287e684535d5cce632")
  },{
    $set:{
      name: "buLLDozER"
    },
    $inc:{
      age: 1
    }
  },{
    returnOriginal: false
  }).then((result)=>{
    console.log(result);
  });

  // db.close();
});
