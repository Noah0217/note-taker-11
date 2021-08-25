//dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const notes = require("./Develop/db/db.json");

//server dependencies 
const app = express();
const PORT = process.env.PORT
