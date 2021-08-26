//dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const notes = require("./Develop/db/db.json");

//path
const mainPath = path.join(__dirname, "./Develop/public")

//server dependencies & port to live server
const app = express();
const PORT = process.env.PORT || 3000;

//middleware paths for api https://stackoverflow.com/questions/11321635/nodejs-express-what-is-app-use
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

//route to html notes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(mainPath, "notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(db, "db.json"))
    return res.body
})
app.get("*", function(req, res) {
    res.sendFile(path.join(mainPath, "index.html"));
});

//successfully connected to port
app.listen(PORT, () => 
console.log(`successfully connected to http://localhost:${PORT}`)); //https://stackoverflow.com/questions/37929173/significance-of-port-3000-in-express-apps
