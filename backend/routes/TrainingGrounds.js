let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let timeModel = require('../models/TimeModel');
let {multiplyParameters} = require('../models/CrewModel');
const {PlayerModel} = require("../models/PlayerModel");
let {updateParameters} = require('../models/ShipModel')
// Connecting to the Database
mongoose.connect("mongodb://localhost/CotSdb");
let db = mongoose.connection;
let {decryptCookie} = require("../models/AuthModel");
const {findPlayerInDbAndCheckCookie} = require('../models/RequestModel');

// Check connection to db
db.once("open", function () {
    console.log("Connected to MongoDb for route TrainingGrounds");
});

// Check for db errors
db.on("error", function (err) {

    console.log(err);
});


/* GET home page. */
router.post('/', (req, res, next) => {
    let reqData = req.body;

    findPlayerInDbAndCheckCookie(req, res, (player) => {
        let skillToTrain = player.crew.find(a => a.number === reqData.crewMember.number).skills.find(a => a.shortName === reqData.skill.shortName);
        skillToTrain.value++;
        multiplyParameters(player.parameters, player.crew);
        updateParameters(player.parameters, player.ship);

        PlayerModel.updateOne({nickname: player.nickname}, player, (err) => {
            if (err) console.log(err);
            else res.send({crew: player.crew})

        })
    })


})

module.exports = router;

