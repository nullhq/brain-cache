let express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

let app = express();

const absoluteIndexPath = __dirname + "/views/index.html";

app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.sendFile(absoluteIndexPath);
});

app.get("/json", function(req, res) {
    res.json({message: process.env.MESSAGE_STYLE == "uppercase" ? "HELLO JSON" : "Hello json"});
});

app.get("/now", function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.json({time: req.time});
});

app.get("/:word/echo", function(req, res, next) {
    let echoWord = req.params.word;
    res.json({echo: echoWord});
});

app.route("/name")
    .get(function(req, res, next) {
        let firstname = req.query.first;
        let lastname = req.query.last;

        res.json({name: firstname + ' ' + lastname});
    }).post(function(req, res){
        let firstname = req.body.first;
        let lastname = req.body.last;

        res.json({name: firstname + ' ' + lastname});
    });













 module.exports = app;
