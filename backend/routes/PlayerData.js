let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let timeModel = require('../models/TimeModel');
let {ShipElement, updateParameters} = require('../models/ShipModel');
let {PlayerModel} = require("../models/PlayerModel");
let {decryptCookie} = require('../models/AuthModel');
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
    let playerData = decryptCookie(reqData.cookie);
    console.log(playerData);
    switch (reqData.action) {
        case 'get':
            PlayerModel.findOne({nickname: playerData.username}, (err, obj) => {
                if (err) console.log(err);
                if (obj) res.send({player: obj});
                else res.send({errMsg: 'Invalid session!'})
            })
            break;
    }


})

module.exports = router;

