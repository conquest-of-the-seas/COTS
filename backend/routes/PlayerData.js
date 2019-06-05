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
    console.log("Connected to MongoDb for route PlayerData");
});

// Check for db errors
db.on("error", function (err) {

    console.log(err);
});


/* GET home page. */
router.post('/', (req, res, next) => {
    let reqData = req.body;
<<<<<<< HEAD

    findPlayerInDbAndCheckCookie(req, res, (playerData) => {
        switch (reqData.action) {
            case 'GET_PLAYER_DATA':
                res.send({player: playerData}); break;
        }
    })
=======
    findPlayerInDbAndCheckCookie(req, res, (playerData) => {
        switch (reqData.action) {
            case 'GET_PLAYER_DATA':
                res.send({player: playerData})

                break;
        }
    });

>>>>>>> cb364a5c2a3da59aa33e98767229f23d4fb7d7b3
})

module.exports = router;

