// Sets up file System
const fs = require("fs");
// Sets up the Express App
const express = require('express');
// Sets up the Path Node.package
const path = require("path");

// Sets up the express property and ports
const app = express();
const PORT = process.env.PORT || 5050;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
// index.html route
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));
// notes.html route
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));


// Listening on port
app.listen(PORT, () => console.log(`App listening on PORT http://localhost:${PORT}`));
