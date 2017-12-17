const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if (err){
    console.log("Unable to connect to MongoDB server");
    return;
  }
  console.log("Connect to MongoDB server");

  //deleteMany target multiple documents
  // db.collection("Todos").deleteMany({text: "Eat lunch"}).then((result)=>{
  //   console.log(result);
  //   //result is a json object,
  //   //one of the field in result is called result with field ok(status), n(# of deleted)
  // });

  //deleteOne targe one document, find the first match to delete
  // db.collection("Todos").deleteOne({text:"Eat lunch"}).then((result)=>{
  //   console.log(result);
  // });

  //findOneAndDelete target one and return the deleted value
  // db.collection("Todos").findOneAndDelete({text:"Eat lunch"}).then((result)=>{
  //     console.log(result);
  // });
  // returning the document deleted
  // { lastErrorObject: { n: 1 },
  // value:
  //  { _id: 5a01373fc26468462b101171,
  //    text: 'Eat lunch',
  //    completed: false },
  // ok: 1 }

  db.collection("Users").deleteMany({name:"buLLDozER"}).then((result)=>{
    console.log(`Successfull delete ${result.result.n} objects`);
  });

  db.collection("Users").findOneAndDelete({_id:new ObjectID("5a0009d485f80335dc038cab")}).then((result)=>{
    console.log(result);
  });

  // db.close();
});
