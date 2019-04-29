let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let timeModel = require('../models/TimeModel');
let {ShipElement, updateParameters} = require('../models/ShipModel');
let {PlayerModel} = require("../models/PlayerModel");
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
        case 'get':
            findPlayerInDbAndCheckCookie(req, res, (obj) => res.send({ship: obj.ship, hangar: obj.hangar}));
            break;
        case 'use':
            findPlayerInDbAndCheckCookie(req, res, (obj) => {
                let item = reqData.item;
                let oldObj = Object.assign({}, obj.ship[item.type]);
                if (obj.hangar.find(a => a.number === item.number)) {
                    obj.ship[item.type] = item;
                    updateParameters(obj.parameters, obj.ship);
                    obj.hangar.push(oldObj);
                    obj.hangar = obj.hangar.filter(a => a.number !== item.number);
                    PlayerModel.updateOne({nickname: obj.nickname}, obj, (err) => {
                        res.send({ship: obj.ship, hangar: obj.hangar})
                    })
                }
            })
            break;
        case 'addMeRandomItem':
            findPlayerInDbAndCheckCookie(req, res, (obj) => {
                let partsArr = ['mast', 'cabins', 'oars', 'sails', 'hull', 'deck', 'wheel'];
                obj.hangar.push(new ShipElement(Math.ceil(Math.random() * 5), partsArr[Math.floor(Math.random() * 7)]));
                PlayerModel.updateOne({nickname: obj.nickname}, obj, (err) => {
                    if (err) console.log(err)
                    else res.send({ship: obj.ship, hangar: obj.hangar})
                })
            })
            break
    }


})

module.exports = router;

