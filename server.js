// Sets up the Express App
const express = require('express');

// Sets up the express property and ports
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Router
require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);

// Listening on port
app.listen(PORT, () => {
    console.log(`App listening on PORT http://localhost:${PORT}`)
});
