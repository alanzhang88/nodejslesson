console.log('Starting notes.js');

const fs = require('fs');

function fetchNotes(){
  try{
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  }catch(err){
    return [];
  }
}

function saveNotes(notes){
  fs.writeFileSync("notes-data.json",JSON.stringify(notes));
}

function addNotes(title,body){
  // console.log("addNotes");
  // return 'New Note';
  // console.log('Adding notes',title,body);
  var notes = fetchNotes();
  var note = {
    "title":title,
    "body":body
  };

  var duplicateNotes = notes.filter((note)=> note.title===title);
  if(duplicateNotes.length===0){
    notes.push(note);
    saveNotes(notes);
    return note
  }
}

function getAll(){
  // console.log('Getting all notes');
  return fetchNotes();
}

function removeNodes(title){
  var notes = fetchNotes();
  var newnotes = notes.filter((note)=> note.title !== title);
  saveNotes(newnotes);
  return notes.length !== newnotes.length;
}

function getNotes(title){
  // console.log('Get notes',title);
  // var note;
  var notes = fetchNotes();
  var selectedNote = notes.filter((note) => note.title === title);
  // return selectedNote.length === 0 ? note : selectedNote[0];
  return selectedNote[0];
}

function add(a,b){
  return a + b;
}

module.exports = {addNotes,getAll,getNotes,removeNodes}
