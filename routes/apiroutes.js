// Loading db.json for the data, it works as mock-database
const fs = require('fs');
// How can I give to each note a unique id?
//look into npmjs.com
const shortid = require('shortid');

// exporting api routes
module.exports = (app) => {
    //Sets the /api/notes app
    app.get("/api/notes", (req, res) => {
        // file path = db/db.json
        //fs.readFile( filename, encoding, callback_function )
        //filename: It holds the name of the file to read or the entire path if stored at other location.
        //encoding: It holds the encoding of file. Its default value is ‘utf8’.
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            //callback_function: It is a callback functiion that is called after reading of file. It takes two parameters:
            //err: If any error occured.
            //data: Contents of the file.
            if (err) {
                console.error(err);
            } else {
                res.json(JSON.parse(data));
            }
        })
    });

    app.post("/api/notes", (req, res) => {
        //https://www.npmjs.com/package/shortid
        //shortid.generate() / generates a unique id for each note for everytime..
        req.body.id = shortid.generate()
        // pushes the parsed data to request body which contains key-value pairs..
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            let givenNote = JSON.parse(data);
            givenNote.push(req.body);

            //it writes the notes into db.json file.
            // syntax: fs.writeFile( file, data, options, callback )
            //file: It is a string, Buffer, URL or file description integer that denotes the path of the file where it has to be written. Using a file descriptor will make it behave similar to fs.write() method.
            //data: It is a string, Buffer, TypedArray or DataView that will be written to the file.
            //options: It is an string or object that can be used to specify optional parameters that will affect the output. It has three optional parameter:
            //encoding: It is a string value that specifies the encoding of the file. The default value is ‘utf8’.
            //mode: It is an integer value that specifies the file mode. The default value is 0o666.
            //flag: It is a string value that specifies the flag used while writing to the file. The default value is ‘w’.
            fs.writeFile("./db/db.json", JSON.stringify(givenNote), (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully\n");
                    res.json(req.body);
                }
            });
        });
    });
    //app.delete(path, callback)
    //path: It is the path for which the middleware function is being called.
    //callback: It is a middleware function or a series/array of middleware functions.
    app.delete("/api/notes/:id", (req, res) => {
        // id of the parameter which is requested
        let id = req.params.id
        // catch that file we need to readfile and parse that data 
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            data = JSON.parse(data);

            //it filters the data which if the text called with the trash button, also the same unique id is equal
            data = data.filter(text => text.id != id);

            //empty {} file will be written on data which is requested by user..
            fs.writeFile("./db/db.json", JSON.stringify(data), (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File deleted successfully\n");
                    res.json({});
                }
            });
        })
    });
}