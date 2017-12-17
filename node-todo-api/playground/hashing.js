//need crypto module from npm
const {SHA256} = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//
// var message = "I am user number 1";
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data: data,
//   hash: SHA256(JSON.stringify(data) + "somesecret").toString() //we add some salt(random bits) in the secret
// }
//
//
// var resultHash = SHA256(JSON.stringify(token.data) + "somesecret").toString();
//
// if(resultHash === token.hash){
//   console.log("Data is not changed");
// }
// else{
//   console.log("Not safe data");
// }


//all the protocol above are standardized into a library called JWT (Json web token)
// jwt.sign, jwt.verify for digital signature and verification
// var data = {
//   id: 10
// };
// var token = jwt.sign(data,"123abc");
// console.log(token);
// var decoded = jwt.verify(token,"123abc");
// console.log(decoded);

var password = "123abc!";
//generate a salt to password
bcrypt.genSalt(10,(err,salt)=>{
  bcrypt.hash(password,salt,(err,hash)=>{
    console.log(hash);
  })
});

var hashedpassword = "$2a$10$fNR5y8AmyB8/S2qGVjvy0.6kLUqa5PjPHm78sN1kwzMOU83zPUTsK";
bcrypt.compare(password,hashedpassword,(err,res)=>{
  console.log("Response: ",res);
});
