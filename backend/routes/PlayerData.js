let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let timeModel = require('../models/TimeModel');
let {ShipElement, updateParameters} = require('../models/ShipModel');
let {PlayerModel} = require("../models/PlayerModel");
let {decryptCookie} = require('../models/AuthModel');
const {findPlayerInDbAndCheckCookie} = require('../models/RequestModel');
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


/* GET home page. */
router.post('/', (req, res, next) => {
    let reqData = req.body;

    findPlayerInDbAndCheckCookie(req, res, (playerData) => {
        switch (reqData.action) {
            case 'GET_PLAYER_DATA':
                res.send({player: playerData}); break;
        }
    })
})

module.exports = router;

