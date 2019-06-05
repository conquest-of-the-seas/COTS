const {findPlayerInDbAndCheckCookie} = require('../models/RequestModel');

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// Connecting to the Database
mongoose.connect("mongodb://localhost/CotSdb");
let db = mongoose.connection;

// Check connection to db
db.once("open", function () {
    console.log("Connected to MongoDb for route Articles");
});

// Check for db errors
db.on("error", function (err) {

    console.log(err);
});

// Bringing in model
let ArticleModel = require("../models/ArticleModel")

let tempReq = undefined;

/* GET home page. */
router.get('/', (req, res, next) => {
    ArticleModel.find({}, function (err, arr) {
        res.send(arr);
    });
}).post('/', function (req, res, next) {
    console.log(req.headers.cookie);
    findPlayerInDbAndCheckCookie(req, res, (playerData) =>  {
        let newArticle = new ArticleModel();
        newArticle.text = req.body.text;
        newArticle.title = req.body.title;

        ArticleModel.find({}, function (err, arr) {
            let items = arr.length;
            newArticle.number= items;
            newArticle.save().then(() => { 
                res.send('New Article Created');
            }).catch((err)=>{
                console.log('An error while created article was caught');
            });
        });
    });
});

module.exports = router;
