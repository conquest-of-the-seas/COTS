const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const timeModel = require('../models/TimeModel');
const Ship = require('../models/ShipModel').ship;
const SaltRounds = 10;
const {createCookie} = require('../models/AuthModel');


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
let {PlayerModel} = require("../models/PlayerModel");


/* GET home page. */
router.get('/', (req, res, next) => {
}).post('/', (req, res, next) => {
    let loginData = req.body;


    //newPlayer.lastSeen = timeModel.getCurrentDay();
    //wPlayer.ips.push(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    console.log(loginData)
    console.log('XD')
    PlayerModel.findOne({nickname: loginData.nickname}, (err, obj) => {
        console.log('matching lol')
        if (err) console.log(err);
        if (obj !== null) {
            console.log('matching')
            bcrypt.compare(loginData.password, obj.password, (err, match) => {
                console.log('matching kk')
                if (err) console.log(err);
                if (match) {
                    obj.cookie = createCookie(obj.nickname, obj._id);
                    res.send({cookie: obj.cookie, errMsg: 'Login successful!'});
                    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                    if (obj.ips.indexOf(ip) === -1) obj.ips.push(ip);
                    //delete obj._id

                    PlayerModel.updateOne({nickname: obj.nickname}, obj, (err) => {
                        if (err) console.log(err);
                    })
                }
                else {
                    res.send({errMsg: 'Wrong Password!'})
                }
            });
        }
        else res.send({errMsg: 'No such username in database!'})
    })

});

module.exports = router;
