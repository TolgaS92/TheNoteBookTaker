// Loading db.json for the data, it works as mock-database
const fs = require('fs');
// How can I give to each note a unique id?
//look into npmjs.com
const shortid = require('shortid');
console.log(shortid.generate());


// exporting api routes
module.exports = (app) => {
    //Sets the /api/notes app
    app.get("/api/notes", (req, res) => {

    });

    app.post("/api/notes", (req, res) => {

    });

    app.delete("/api/notes/:id", (req, res) => {

    });
}