let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let timeModel = require('../models/TimeModel');
let {pirateTypeNames, CrewMember} = require('../models/CrewModel');
const {PlayerModel} = require("../models/PlayerModel");
let {decryptCookie} = require("../models/AuthModel");

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

    switch (reqData.action) {
        case 'get':
            PlayerModel.findOne({nickname: playerData.nickname}, (err, obj) => {
                if (obj) {
                    if (obj.cookie === reqData.cookie) {
                        res.send({crew: obj.crew});
                    }
                    else res.send({errMsg: 'Invalid session!', session: true})
                }
                else res.send({errMsg: 'Invalid session!', session: true})
            })
            break;
        case 'addMeRandomItem':
            PlayerModel.findOne({nickname: playerData.nickname}, (err, obj) => {
                if (obj) {
                    if (obj.cookie === reqData.cookie) {
                        obj.crew.push(new CrewMember(pirateTypeNames[Math.floor(Math.random() * pirateTypeNames.length)]));
                        PlayerModel.updateOne({nickname: playerData.nickname}, obj, (err) => {
                            if (err) console.log(err);
                            else res.send({crew: obj.crew})
                        })
                    }
                    else res.send({errMsg: 'Invalid session!', session: true})
                }
                else res.send({errMsg: 'Invalid session!', session: true})

            })
            break
    }


})

module.exports = router;

