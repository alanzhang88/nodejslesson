const express = require('express');
//hbs for handlerbars to create front end
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//add partial files for handlerbars templates
hbs.registerPartials(__dirname+'/views/partials');
//to inject parits we use {{> partials_name}}

app.set('view engine','hbs');//set configurations for the Server
//we set the view engine and the value we set for the key is hbs
//views directory is the default directory for the templates
//hbs suffix is important for files in the views that uses hbs


//we add a middleware to the webserver, if we do not call next() at the end, then the middleware will hold and all the rest of the webpages on this cannot be accessed
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync('server.log',log + '\n');
  next();
});

//this is an example of middleware that does not call next and hijack all the incoming request to the web server
// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// })

//note that middleware, order matters, if we put this before maintenance, we can still access file under the public folder
//use a static director as middleware
app.use(express.static(__dirname + '/public')); //we put all the file in the public directory on the root for access.


//register a helperfunction to elimintate duplicate calls to a function that will be repeated called in different pages
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

//to pass argument for the function we do something likes
//{{screamIt welcomeMessage}} inside handlerbars
//{{helpername arg1 arg2 ...}}
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});



//req is the message sent in to your server
//res is the respond you reply to the user
app.get('/',(req, res)=>{
  // res.send('<h1>Hello express</h1>');
  // res.send({
  //   name : 'buLLDozER',
  //   likes:['CSGO','PUBG']
  // });
  var name = 'buLLDozER';
  res.render('home.hbs',{
    pageTitle:'Home Page',

    welcomeMessage: `Hi! This is the homepage of ${name}`
  });
});

app.get('/about',(req,res)=>{
  //we send the rendered template in views directory.
  //the object is the things we want to dynamically inject into the page
  res.render('about.hbs',{
    pageTitle : 'About Page',

  });
});

app.get('/project',(req,res)=>{
  res.render('project.hbs',{
    pageTitle: 'My Project'
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage: "Cannot fulfill the request"
  });
});

//bind the web app to a port
app.listen(3000,()=>{
  console.log('Server is up on port 3000')
});
