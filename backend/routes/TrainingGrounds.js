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
    PlayerModel.findOne({nickname: playerData.nickname}, (err, obj) => {
        if (obj) {
            if (obj.cookie === reqData.cookie) {
                let skillToTrain = obj.crew.find(a => a.number === reqData.crewMember.number).skills.find(a => a.shortName === reqData.skill.shortName);
                skillToTrain.value++;
                multiplyParameters(obj.parameters, obj.crew);
                updateParameters(obj.parameters, obj.ship);

                PlayerModel.updateOne({nickname: playerData.nickname}, obj, (err) => {
                    if (err) console.log(err);
                    else res.send({crew: obj.crew})

                })
            }
            else res.send({errMsg: 'Invalid session!', session: true});
        }
        else res.send({errMsg: 'Invalid session!', session: true});
    })


})

module.exports = router;

