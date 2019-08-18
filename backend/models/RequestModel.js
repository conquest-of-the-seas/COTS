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


function findPlayerInDbAndCheckCookie(req, res, callback, isBlank) {
    let reqData = req.body;
    let playerData = decryptCookie(req.cookies.cots);
    if (req.cookies.cots === undefined && isBlank) {
        //callback is required, else an error is thrown.
        if (callback)  PlayerModel.findOne({nickname: playerData.nickname}, (err, user) => {
            if (err) res.send({errMsg: 'An Error occurred trying to fetch your user data from DB'})
            else callback(user)
        })
        else throw new Error('unused DB access found at path: ' + req.originalUrl)
    }
    else if (req.cookies.cots === undefined) {
        console.log('blank request at path ' + req.originalUrl)
        res.send({errMsg: 'unauthorised'})
    }
    else {
        //contains nickname, userId, userAgent, timeStamp
        let cookieData = decryptCookie(req.cookies.cots);
        //checks device data from the request and the cookies
        console.log('xD')
        console.log(req.cookies.ua)
        console.log(cookieData)
        if (req.cookies.ua === cookieData.userAgent) {
            //if the cookies is decrypted successfully
            if (typeof playerData === 'object' && playerData.nickname) PlayerModel.findOne({nickname: playerData.nickname}, (err, obj) => {
                if (err) res.send({errMsg: 'An Error occurred trying to fetch your player data from DB'})
                else if (obj) {
                    if (obj.cookie === req.cookies.cots) {
                        if (callback) callback(obj);
                        else throw new Error('unused DB access fount at path: ' + req.originalUrl)
                    }
                    else {
                        console.log('1')
                        res.send({errMsg: 'Invalid session!', session: true})
                    }
                }
                else {
                    console.log('2')
                    res.send({errMsg: 'Invalid session!', session: true})
                }
            });
            else {
                console.log('3')
                res.send({errMsg: 'Invalid session!', session: true})
            }
        }
        else res.send({errMsg: 'Stolen Cookie', session: true})
    }
}


/** functions above */
/** export below */

module.exports = {
    findPlayerInDbAndCheckCookie: findPlayerInDbAndCheckCookie
};

/**export above */
/** commented out stuff below*/
