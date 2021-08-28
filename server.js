//dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const notes = require('./db/db.json'); 

//path
const mainPath = path.join(__dirname, './public') 
const db = path.join(__dirname, "./db") 

//server dependencies & port to live server
const app = express();
const PORT = process.env.PORT || 3000;

//middleware paths for api https://stackoverflow.com/questions/11321635/nodejs-express-what-is-app-use
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

//route to html notes
app.get('/notes', function(req, res) {
    res.sendFile(path.join(mainPath, 'notes.html'));
});
app.get('/api/notes', function(req, res) {
    res.sendFile(path.join(db, 'db.json'))
    return res.body
});
app.post('/api/notes', function(req, res) {
    console.log(req.body)
    console.log("post route hit")
    res.sendFile(path.join(db, 'db.json'))
    return res.body
});
app.get("*", function(req, res) {
    res.sendFile(path.join(mainPath, 'index.html'));
});

//Read and write file 
app.route("/api/notes")
    // Grab the notes list
    .get(function (req, res) {
        res.json(notes);
    })

.post(function (req, res) {
    let jsonFilePath = path.join(__dirname, "/db/db.json");
    let newNote = req.body;

    // This allows the test note to be the original note.
    let highestId = 99;
    // This loops through the array and finds the highest ID.
    for (let i = 0; i < notes.length; i++) {
        let individualNote = notes[i];

        if (individualNote.id > highestId) {
            // highestId will always be the highest numbered id in the notesArray.
            highestId = individualNote.id;
        }
    }
    // This assigns an ID to the newNote. 
    newNote.id = highestId + 1;
    // We push it to db.json.
    notes.push(newNote)

    // Write the db.json file again.
    fs.writeFile(jsonFilePath, JSON.stringify(notes), function (err) {

        if (err) {
            return console.log(err);
        }
        console.log("Your note was saved!");
    });
    // Gives back the response, which is the user's new note. 
    res.json(newNote);
});


//successfully connected to port
app.listen(PORT, () => 
console.log(`successfully connected to http://localhost:${PORT}`)); //https://stackoverflow.com/questions/37929173/significance-of-port-3000-in-express-apps

