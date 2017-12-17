const express = require("express");
const bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");
var {mongoose} = require("./db/mongoose.js");
var {Todo} = require("./models/todo.js");
var {User} = require("./models/user.js");
const _ = require("lodash");
var {authenticate} = require("./middleware/authenticate.js");
// const bcrypt = require("bcryptjs");

var app = express();

app.use(bodyParser.json()); //.json() return a function which will parse the body into json form

app.post("/todos",authenticate,(req,res)=>{
  // console.log(req.body);
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  todo.save().then((doc)=>{
    res.status(200).send(doc);
  }, (e)=>{
    res.status(400).send(e);
  });
});

app.get("/todos",authenticate,(req,res)=>{
  Todo.find({_creator:req.user._id}).then((todos)=>{
    res.status(200).send({todos});
  }, (e)=>{
    res.status(400).send(e);
  });
});

app.get("/todos/:id",authenticate,(req,res)=>{
  if(!ObjectID.isValid(req.params.id)){
    res.status(404).send({errorMessage: "Invalid ID"});
  }
  else{
    Todo.findOne({
      _id:req.params.id,
      _creator:req.user._id
    }).then((todo)=>{
      if(!todo){
        res.status(404).send({errorMessage: "ID not found!"});
      }
      else res.send(todo);
    }).catch((e)=>{
      res.status(400).send(e);
    });
  }
});

app.delete("/todos/:id",authenticate,(req,res)=>{
  if(!ObjectID.isValid(req.params.id)){
    res.status(404).send({errorMessage: "Invalid ID"});
  }
  else{
    Todo.findOneAndRemove({
      _id:req.params.id,
      _creator:req.user._id
    }).then((todo)=>{
      if(!todo){
        res.status(404).send({errorMessage:"ID not found"});
      }
      else{
        res.status(200).send(todo);
      }
    }).catch((e)=>{
      res.status(400).send(e);
    });
  }
});

app.patch("/todos/:id",authenticate,(req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body,['text','completed'])//picked the attributes that are allowed to update out of the body

  if(!ObjectID.isValid(id)){
    res.status(404).send({errorMessage: "Invalid ID"});
  }

  if(_.isBoolean(body.completed)&&body.completed==true){
    body.completedAt = new Date().getTime()
  }
  else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id:id,
    _creator:req.user._id
  },
  {
      $set: body //need to use the document modifier ops
  },{
    new: true //return the revised one
  }).then((todo)=>{
    if(!todo){
      return res.status(404).send({errorMessage:"ID not found"});
    }
    else res.status(200).send(todo)
  }).catch((e)=>{
    res.status(400).send(e);
  });

});

app.post("/users",(req,res)=>{
  var body = _.pick(req.body,["email","password"]);
  var user = new User(body);
  // var error = user.validateSync();
  // if(error){
  //   return res.status(400).send({message:"Fail to create user", error});
  // }
  //user.generateAuthToken will gives us a token and also save it in the database, this is the function we write but add to the schema
  user.save().then(()=>{
    //res.status(200).send({message:"New user created"});
    return user.generateAuthToken();
  }).then((token)=>{
    //we overide the toJSON method which will be called in the send(user),to send back the thing we want
    res.status(200).header("x-auth",token).send(user);//when create a header with x- , it is a customized header
  }).catch((e)=>{
    res.status(400).send({message:"Fail to create user", error:e});
  });
});

//add a middleware which should be reusable
// var authenticate = (req,res,next) => {
//   var token = req.header("x-auth");
//
//   User.findByToken(token).then((user)=>{
//     if(!user){
//       return Promise.reject();
//     }
//     //res.send(user);
//     req.user = user;
//     req.token = token;
//     next();
//   }).catch((e)=>{
//     res.status(401).send();
//   });
// }

app.get("/users/me",authenticate,(req,res) => {
  // var token = req.header("x-auth");
  //
  // User.findByToken(token).then((user)=>{
  //   if(!user){
  //     return Promise.reject();
  //   }
  //   res.send(user);
  // }).catch((e)=>{
  //   res.status(401).send({message:"Token is not valid"});
  // });
  res.send(req.user);
});

app.post("/users/login",(req,res)=>{
  var body = _.pick(req.body,["email","password"]);
  // User.find({email:body.email}).then((users)=>{
  //   if(users.length>0){
  //     var user = users[0];
  //     bcrypt.compare(body.password,user.password,(err,result)=>{
  //       if(result){
  //         res.status(200).send("login successful");
  //       }
  //       else{
  //         res.status(401).send("password incorrect")
  //       }
  //     });
  //   }
  //   else{
  //     res.status(400).send("User does not exist");
  //   }
  // }).catch((e)=>{
  //   res.status(400).send({error:e});
  // });
  User.findByCredentials(body.email,body.password).then((user)=>{
    // res.send(user);
    return user.generateAuthToken().then((token)=>{
      res.status(200).header("x-auth",token).send(user);
    });
  }).catch((e)=>{
    res.status(400).send();
  });

});

app.delete("/users/me/token",authenticate,(req,res)=>{
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  },()=>{
    res.status(400).send();
  });
});

app.listen(3000,()=>{
  console.log("Listening on port 3000");
});
