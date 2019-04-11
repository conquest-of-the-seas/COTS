/** variable and constants below */
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

/** variable and constants above */
/** classes below */


/** classes above */
/** functions below */

function findPlayerInDbAndCheckCookie(req, res, callback) {
    let reqData = req.body;
    let playerData = decryptCookie(reqData.cookie)
    PlayerModel.findOne({nickname: playerData.nickname}, (err, obj) => {
        if (err) res.send({errMsg: 'An Error occurred trying to fetch your player data from DB'})
        else if (obj) {
            if (obj.cookie === reqData.cookie) {
                if (callback) callback(obj);
                else throw new Error('unused DB access fount at path: ' + req.originalUrl)
            }
            else res.send({errMsg: 'Invalid session!', session: true})
        }
        else res.send({errMsg: 'Invalid session!', session: true})
    })
}

/** functions above */
/** export below */

module.exports = {
    findPlayerInDbAndCheckCookie: findPlayerInDbAndCheckCookie
};

/**export above */
/** commented out stuff below*/
