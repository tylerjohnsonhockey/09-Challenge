//Dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');

//Initialize Enviro Var Port
const app = express();
const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

//Add Notes API Route
app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    let newNote = req.body;
    newNote.id = Math.floor(Math.random() * 5000);
    notes.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
        res.json(newNote);
        return console.log("Added new note: " + newNote.title);
    });
}); 
});

//Delete Note API Route
app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    const newNotes = notes.filter(note => note.id !== parseInt(req.params.id));
  fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err, data) => {
    res.json({msg: 'successfully'});
    return console.log("Deleted note successfully");

  });
});
});

//Get Note ID API Route
app.get('api/notes/:id', (req, res) =>{
  res.json(notes[req.params.id]);
});
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    res.json(notes);
});
});

//HTML Routes
app.get('*', (req, res) => {
    res.sendFile('/public/index.html',{root:__dirname});
 });
app.get('/notes', (req, res) => {
    res.sendFile('/public/notes.html',{root:__dirname});
});
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`)
});