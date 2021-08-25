//dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const notes = require("./Develop/db/db.json");

//server dependencies & port to live server
const app = express();
const PORT = process.env.PORT

//middleware paths for api https://stackoverflow.com/questions/11321635/nodejs-express-what-is-app-use
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

//successfully connected to port
app.listen(PORT, () => 
console.log(`App listening on PORT http://localhost:${PORT}`));