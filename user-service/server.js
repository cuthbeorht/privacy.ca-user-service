const express = require("express");
const bodyParser = require("body-parser");

// Create the express app
const app = express();

// Parse requests with content type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

const dbConfig = require("./config/database.config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise; // ???

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connection to MongoDB successful.");
}).catch(err => {
    console.error("Unable to connect to MongoDB: [", err, "]");
    process.exit(1);
});

// Define routes
app.get("/api", (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// get the routes
require("./app/routes/user.routes.js")(app);

app.listen(3000, () => {
    console.log("Service `User-Service` running on port 3000...");
});