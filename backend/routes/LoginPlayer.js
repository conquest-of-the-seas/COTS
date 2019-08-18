const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const timeModel = require('../models/TimeModel');
const Ship = require('../models/ShipModel').ship;
const SaltRounds = 10;
const {createCookie} = require('../models/AuthModel');
const {findPlayerInDbAndCheckCookie} = require('../models/RequestModel');


let cookieParser = require('cookie-parser');
const secretKey = 'This Is My Secret Key';

// Connecting to the Database
mongoose.connect("mongodb://localhost/CotSdb");
let db = mongoose.connection;

// Check connection to db
db.once("open", function () {
    console.log("Connected to MongoDb for route Login");
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

    PlayerModel.findOne({nickname: loginData.nickname}, (err, obj) => {
        if (err) console.log(err);
        if (obj !== null) {
            bcrypt.compare(loginData.password, obj.password, (err, match) => {
                if (err) console.log(err);
                if (match) {
                    obj.cookie = createCookie(obj.nickname, obj._id, req.cookies.ua);
                    res.cookie('cots', obj.cookie, {maxAge: 999999999, httpOnly: true});
                    res.cookie('loggedIn', Date.now(), {maxAge: 999999999});
                    res.send({errMsg: 'Login successful!', redirect: '/'});

                    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                    if (obj.ips.indexOf(ip) === -1) obj.ips.push(ip);
                    // delete obj._id

                    PlayerModel.updateOne({nickname: obj.nickname}, obj, (err) => {
                        if (err) console.log(err);
                    });

                }
                else {
                    res.send({errMsg: 'Wrong Password!'})
                }
            });
        }
        else res.send({errMsg: 'No such username in database!'})
    });

});

module.exports = router;
