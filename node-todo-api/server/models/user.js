const mongoose = require("mongoose");
const valid = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs")
//user model
//valid email, password, tokens array with each contians type and value

//restructure using schema but it allows to customize
var UserSchema = new mongoose.Schema({
  email:{
      required: true,
      trim: true,
      type: String,
      minlength: 1,
      unique: true, // won't be able to have duplicates
      //we use a package validator to help us valid our email structure
      validate: {
        isAsync: false,//need to turn off or will give warning since our function is synchronous but it assumed async
        validator: valid.isEmail, //the function in the library that will help us validate email
        message: "{VALUE} is not a valid email"
      }
  },
  password:{
    type: String,
    required: true,
    minlength: 6
  },
  //tokens array
  tokens:[
    {
      access:{
        type: String,
        required: true
      },
      token:{
        type: String,
        required: true
      }
    }
  ]
});

//methods will turn into a instance method
//write a function to pick the value to send back to the request
UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject(); // to an object with only attributes left

  return _.pick(userObject,["_id","email"]);
}

UserSchema.methods.removeToken = function(token){
  var user = this;
  return user.update({
    $pull:{
      tokens:{
        token:token
      }
    }
  }); //mogodb command $pull to pull out the object that matches the proptery, which means one less item in the array
}

//add customized methods, arrow function does not have a this keyword since it is a lambda function
UserSchema.methods.generateAuthToken = function(){
  var user = this;//this in javascript points to the caller of the fuction
  var access = "auth";
  var token = jwt.sign({_id: user._id.toHexString(),access},'abc123').toString();

  user.tokens.push({access,token});
  return user.save().then(()=>{
    return token;
  });
};

//statics will turn into a model method
UserSchema.statics.findByToken = function (token){
  var User = this;
  var decoded;
  try{
      decoded = jwt.verify(token,'abc123');
  }catch(e){
    // return new Promise((resolve,reject)=>{
    //   reject();
    // });
    return Promise.reject();//can also pass a value/object as error information
  }

  //using "a.b" to query nested attributes
  return User.findOne({
    "_id": decoded._id,
    "tokens.token" : token,
    "tokens.access" : decoded.access
  });
}

UserSchema.statics.findByCredentials = function(email,password){
  var User = this;
  return User.findOne({email}).then((user)=>{
    if(!user){
      return Promise.reject();
    }
    return new Promise((resolve,reject)=>{
      bcrypt.compare(password,user.password,(err,res)=>{
        if(res){
          return resolve(user);
        }
        else{
          return reject();
        }
      });
    });
  })
}

//add a middle ware before the save event
UserSchema.pre('save',function(next){
  var user = this;

  //user.isModified return true if the attribute is just isModified
  if (user.isModified('password')){
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(user.password,salt,(err,res)=>{
        user.password = res;
        next();
      });
    });
  }
  else{
    next();
  }
});

var User = mongoose.model("User",UserSchema);

// var User = mongoose.model("User",{
//   email:{
//       required: true,
//       trim: true,
//       type: String,
//       minlength: 1,
//       unique: true, // won't be able to have duplicates
//       //we use a package validator to help us valid our email structure
//       validate: {
//         isAsync: false,//need to turn off or will give warning since our function is synchronous but it assumed async
//         validator: valid.isEmail, //the function in the library that will help us validate email
//         message: "`{VALUE}` is not a valid email"
//       }
//   },
//   password:{
//     type: String,
//     required: true,
//     minlength: 6
//   },
//   //tokens array
//   tokens:[
//     {
//       access:{
//         type: String,
//         required: true
//       },
//       token:{
//         type: String,
//         required: true
//       }
//     }
//   ]
// });

// var u1 = new User({
//   email:"alanzhang88@gmail.com"
// });
// u1.save().then((doc)=>{
//   console.log(JSON.stringify(doc,undefined,2));
// });

module.exports = {User};
