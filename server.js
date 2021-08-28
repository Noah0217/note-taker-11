//dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const database = require('./db/db.json'); 

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
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

//save note
app.route("/api/notes")
    .get(function (req, res) {
        res.json(database);
    })

    // Add a new note to the json db file.
    .post(function (req, res) {
        let jsonFilePath = path.join(__dirname, "/db/db.json");
        let newNote = req.body;
        let highestId = 99;
        for (let i = 0; i < database.length; i++) {
            let individualNote = database[i];

            if (individualNote.id > highestId) {
                highestId = individualNote.id;
            }
        } 
        newNote.id = highestId + 1;
        database.push(newNote)

        fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("Your note was saved!");
        }); 
        res.json(newNote);
    });

    //delete note
    app.delete("/api/notes/:id", function (req, res) {
        let jsonFilePath = path.join(__dirname, "/db/db.json");
        for (let i = 0; i < database.length; i++) {
    
            if (database[i].id == req.params.id) {
                database.splice(i, 1);
                break;
            }
        }
        // Write to db file
        fs.writeFileSync(jsonFilePath, JSON.stringify(database), function (err) {
    
            if (err) {
                return console.log(err);
            } else {
                console.log("Your note was deleted!");
            }
        });
        res.json(database);
    });

//successfully connected to port
app.listen(PORT, () => 
console.log(`successfully connected to http://localhost:${PORT}`)); //https://stackoverflow.com/questions/37929173/significance-of-port-3000-in-express-apps