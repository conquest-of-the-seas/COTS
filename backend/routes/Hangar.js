let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let timeModel = require('../models/TimeModel');
let ShipElement = require('../models/ShipModel').shipElement;


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
router.get('/', (req, res, next) => {
    PlayerModel.findOne({nickname: 'test4'}, (err, obj) => {
        obj.hangar.push(new ShipElement(2, 'mast'),
            new ShipElement(2, 'cabins'),
            new ShipElement(5, 'oars'),
            new ShipElement(4, 'sails'),
            new ShipElement(3, 'hull'),
            new ShipElement(2, 'deck'),
            new ShipElement(3, 'wheel'));
        res.send({ship: obj.ship, hangar: obj.hangar})
    })
}).post('/', (req, res, next) => {
    let action = req.body.action

});

module.exports = router;
