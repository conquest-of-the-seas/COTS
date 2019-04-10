let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let timeModel = require('../models/TimeModel');
let {ShipElement, updateParameters} = require('../models/ShipModel');
let {PlayerModel} = require("../models/PlayerModel");
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
                if (err) console.log(err)
                if (obj){
                    if (obj.cookie===reqData.cookie) res.send({ship: obj.ship, hangar: obj.hangar});
                    else res.send({errMsg: 'Invalid session!', session: true});
                }
                else res.send({errMsg: 'Invalid session!', session: true});
            })
            break;
        case 'use':
            PlayerModel.findOne({nickname: playerData.nickname}, (err, obj) => {
                if (obj) {
                    if (obj.cookie === reqData.cookie) {
                        let item = reqData.item;
                        let oldObj = Object.assign({}, obj.ship[item.type]);
                        if (obj.hangar.find(a => a.number === item.number)) {
                            obj.ship[item.type] = item;
                            updateParameters(obj.parameters, obj.ship);
                            obj.hangar.push(oldObj);
                            obj.hangar = obj.hangar.filter(a => a.number !== item.number);
                            PlayerModel.updateOne({nickname: playerData.nickname}, obj, (err) => {
                                res.send({ship: obj.ship, hangar: obj.hangar})
                            })
                        }
                        else res.send({errMsg: `You don't own Item #${item.number}`});
                    }
                    else res.send({errMsg: 'Invalid session!', session: true});
                }
                else res.send({errMsg: 'Invalid session!', session: true});
            })
            break;
        case 'addMeRandomItem':
            PlayerModel.findOne({nickname: playerData.nickname}, (err, obj) => {
                if (obj) {
                    if (obj.cookie===reqData.cookie) {
                        let partsArr = ['mast', 'cabins', 'oars', 'sails', 'hull', 'deck', 'wheel'];
                        obj.hangar.push(new ShipElement(Math.ceil(Math.random() * 5), partsArr[Math.floor(Math.random() * 7)]));
                        PlayerModel.updateOne({nickname: playerData.nickname}, obj, (err) => {
                            if (err) console.log(err)
                            else res.send({ship: obj.ship, hangar: obj.hangar})

                        })
                    }
                    else res.send({errMsg: 'Invalid session!', session: true});
                }
                else res.send({errMsg: 'Invalid session!', session: true});

            })
            break
    }


})

module.exports = router;

