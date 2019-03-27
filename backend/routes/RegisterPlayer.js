let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let timeModel = require('../models/TimeModel');
let Ship = require('../models/ShipModel').ship;

// Connecting to the Database
mongoose.connect("mongodb://localhost/CotSdb");
let db = mongoose.connection;

// Check connection to db
db.once("open", function () {
    console.log("Connected to MongoDb");
});

// Check for db errors
db.on("error", function (err) {

    console.log(err);
});

// Bringing in model
let PlayerModel = require("../models/PlayerModel")


/* GET home page. */
router.get('/',  (req, res, next) => {
}).post('/',  (req, res, next) => {
    let newPlayer = new PlayerModel();
    newPlayer = Object.assign(newPlayer, req.body);
    newPlayer.registerDate = timeModel.getCurrentDay();
    newPlayer.lastSeen = timeModel.getCurrentDay();
    newPlayer.ips.push(req.headers['x-forwarded-for'] || req.connection.remoteAddress);


    PlayerModel.find({},  (err, arr) => {
        let items = arr.length;
        newPlayer.number = items;
        newPlayer.ship = new Ship(items);
        newPlayer.save().then(() => res.send('New Player Created')).catch((err) => {
            if (err.code === 11000) res.send('Such username already exists.')
        });
    })

});

module.exports = router;
