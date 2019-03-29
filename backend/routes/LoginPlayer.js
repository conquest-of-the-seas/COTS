const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const timeModel = require('../models/TimeModel');
const Ship = require('../models/ShipModel').ship;
const SaltRounds = 10;

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
router.get('/', (req, res, next) => {
}).post('/', (req, res, next) => {
    let loginData = req.body;


    //newPlayer.lastSeen = timeModel.getCurrentDay();
    //wPlayer.ips.push(req.headers['x-forwarded-for'] || req.connection.remoteAddress);

    console.log(loginData)
    PlayerModel.findOne({nickname: loginData.nickname}, (err, obj) => {
        if (obj !== null) {
            bcrypt.compare(loginData.password, obj.password, (err, match) => {
                if (match) {
                    res.send({nickname: loginData.nickname, errMsg: 'Login successful!'});
                    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                    if (obj.ips.indexOf(ip) === -1) obj.ips.push(ip);
                    delete obj._id

                    PlayerModel.updateOne({nickname: loginData.nickname}, obj, (err) => {
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
