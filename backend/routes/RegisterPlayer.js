const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const timeModel = require('../models/TimeModel');
const {PlayerModel} = require("../models/PlayerModel");
const {Ship, updateParameters} = require('../models/ShipModel');
const {multiplyParameters, defaultCrew} = require('../models/CrewModel');
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


/* GET home page. */
router.get('/', (req, res, next) => {
}).post('/', (req, res, next) => {
    console.time('start');
    let newPlayer = new PlayerModel();

    let registerData = {
        nickname: req.body.nickname,
        password: req.body.password,
        faction: req.body.faction,
        email: req.body.email
    }

    newPlayer = Object.assign(newPlayer, registerData);
    newPlayer.registerDate = timeModel.getCurrentDay();
    newPlayer.lastSeen = timeModel.getCurrentDay();
    newPlayer.ips.push(req.headers['x-forwarded-for'] || req.connection.remoteAddress);


    PlayerModel.find({}, (err, arr) => {
        let number = arr.length;
        newPlayer.number = number;
        newPlayer.ship = new Ship(number);
        newPlayer.crew.push(...defaultCrew());
        multiplyParameters(newPlayer.parameters, newPlayer.crew);
        updateParameters(newPlayer.parameters, newPlayer.ship);


        bcrypt.hash(newPlayer.password, SaltRounds, (err, hash) => {
            if (err) console.log(err);
            else {
                newPlayer.password = hash;
                newPlayer.save().then(() => {
                    console.timeEnd('start');
                    res.send({
                        nickname: newPlayer.nickname,
                        errMsg: 'New Player Created'
                    })
                }).catch((err) => {
                    if (err.code === 11000) res.send({errMsg: 'Such username already exists.'})
                });
            }
        });
//
    })

});

module.exports = router;
