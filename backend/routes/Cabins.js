let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let timeModel = require('../models/TimeModel');
let {pirateTypeNames, CrewMember} = require('../models/CrewModel');
const {PlayerModel} = require("../models/PlayerModel");
let {decryptCookie} = require("../models/AuthModel");
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

    switch (reqData.action) {
        case 'GET_PLAYER_CABINS':
            findPlayerInDbAndCheckCookie(req, res, (obj) => res.send({crew: obj.crew}));
            break;
        case 'ADD_RANDOM_CABINS':
            findPlayerInDbAndCheckCookie(req,res,(obj)=>{
                obj.crew.push(new CrewMember(pirateTypeNames[Math.floor(Math.random() * pirateTypeNames.length)]));
                PlayerModel.updateOne({nickname: obj.nickname}, obj, (err) => {
                    if (err) console.log(err);
                    else res.send({crew: obj.crew})
                })
            })
            break
    }


})

module.exports = router;

