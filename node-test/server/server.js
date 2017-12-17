const express = require('express');

var app = express();

app.get('/',(req,res)=>{
  res.status(404)
     .send({
       name:'buLLDozER',
       errorMessage: 'Page Not Found'
     });
});

app.get('/user',(req,res)=>{
    res.status(200).send([
      {name:'buLLDozER',age:22},{name:'alanzhang88',age:22}
      ]);
});

app.listen(3000);

module.exports.app = app;
