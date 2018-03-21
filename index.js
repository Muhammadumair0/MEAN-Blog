const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const router = express.Router();
const route = require("./routes/routes");
const bodyParser = require("body-parser");
const path = require("path");
const user = require("./data-server/users.json");
// require("./data-server/seed-db");
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//provide static directory for frontend
app.use(express.static(path.join(__dirname + "/client/dist/")));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, REQUEST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', "X-Requested-With,authorization,content-type");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get("/", (req, res) => {

    res.send("Express App is working");

})
    .listen(3000, (err) => {

        if (err) {
            console.log("Error Connecting to Port 3000");
        } else {

            console.log("Connected to Port Localhost: 3000");
        }
    });
//connect server to angular index.html
// app.get("*", (req, res) => {

//     res.sendFile(path.join(__dirname + "/client/dist/index.html"));

// });


MongoClient.connect(process.env.DB_CONN, (err, database) => {
    app.use(route(router, database));
    if (err) {
        console.log("Unsucessful Connection to database [mlab]");
    } else {

        console.log("Connected to mlab server sucessfully");
    }
});