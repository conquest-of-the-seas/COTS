let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let timeModel = require('../models/TimeModel');
let {pirateTypeNames, CrewMember} = require('../models/CrewModel');


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
router.post('/', (req, res, next) => {
    let reqData = req.body;
    switch (reqData.action) {
        case 'get':
            PlayerModel.findOne({nickname: reqData.nickname}, (err, obj) => {
                if (obj) res.send({crew: obj.crew});
                else res.send({errMsg: 'Invalid session!'})
            })
            break;
        case 'addMeRandomItem':
            PlayerModel.findOne({nickname: reqData.nickname}, (err, obj) => {
                if (obj) {
                    obj.crew.push(new CrewMember(pirateTypeNames[Math.floor(Math.random() * pirateTypeNames.length)]));
                    PlayerModel.updateOne({nickname: reqData.nickname}, obj, (err) => {
                        if (err) console.log(err);
                        else res.send({crew: obj.crew})

                    })

                }
                else {
                    res.send({errMsg: 'Invalid session!'})
                }

            })
            break
    }


})

module.exports = router;

