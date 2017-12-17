console.log('Starting app.js');

const fs = require('fs');
const yargs = require('yargs');
const notes = require('./notes.js');
const _ = require('lodash');

//node inspect file to enter debug mode on version 8+, similar gdb
//list(num) num lines of the place the code paused
//n to next statement
//c to continue
//repl to enter the mode where can just type and access all kinds of var, and you can interact with them
//using debugger keyword to insert break point in source file
//node --inspect-brk file and open chrome at chrome://inspect to debug

//arrow function does not bind this keyword since it is a lambda function
//for a object{}, we can declear key:function just as function(){} where the key is the function name, in this way we can refer this since we have a name

const titleOptions = {
  describe: 'Title of note',
  demand: true, //required paramenter after it
  alias: 't' //-t option
};
const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
};

const argv = yargs
  .command('add','Add a new note',{
    //title flag
    title: titleOptions,
    body: bodyOptions
  })
  .command('list','List all notes')
  .command('read','Read a note',{
    title:titleOptions
  })
  .command('remove','Remove a title',{
    title:titleOptions
  })
  .help() //add the --help flag
  .argv;
//geting from cmd prompt
// var command = process.argv[2];
// console.log('Command: ',command);


// Yargs to parse commnad, need to install from npm
// console.log('yargs ', argv);
var command = argv._[0]
if(command==='add'){
  var note = notes.addNotes(argv.title,argv.body);
  if(typeof note === 'undefined'){
    console.log('note already exist');
  }
  else console.log('new note added');
}
else if(command==='list'){
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s)`);
  allNotes.forEach((note)=>console.log(`Note Title: ${note.title}`));
}
else if(command==='remove'){
  var noteRemoved = notes.removeNodes(argv.title)
  console.log(noteRemoved?'Note was removed':'Note not found');
}
else if(command==='read'){
  var note = notes.getNotes(argv.title);
  if(note){
    console.log('Note Found');
    console.log(`Title: ${note.title}`);
  }
  else{
    console.log('note not found');
  }
}
else{
  console.log('Command not recognized');
}


// reference from my own modele
// console.log('Results: ' + notes.add(3,2));
