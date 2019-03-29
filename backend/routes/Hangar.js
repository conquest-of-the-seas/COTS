let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let timeModel = require('../models/TimeModel');
let ShipElement = require('../models/ShipModel').shipElement;


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
                if (obj) res.send({ship: obj.ship, hangar: obj.hangar});
                else res.send({errMsg: 'Invalid session!'})
            })
            break;
        case 'use':
            PlayerModel.findOne({nickname: reqData.nickname}, (err, obj) => {
                if (obj) {
                    let item = reqData.item;
                    let oldObj = Object.assign({}, obj.ship[item.type]);
                    if (obj.hangar.find(a => a.number === item.number)) {
                        obj.ship[item.type] = item;
                        obj.hangar.push(oldObj);
                        obj.hangar = obj.hangar.filter(a => a.number !== item.number);
                        PlayerModel.updateOne({nickname: reqData.nickname}, obj, (err) => {
                            res.send({ship: obj.ship, hangar: obj.hangar})

                        })
                    }
                    else {
                        res.send({errMsg: `You don't own Item #${item.number}`})
                    }
                }
                else {
                    res.send({errMsg: 'Invalid session!'})
                }
            })
            break;
        case 'addMeRandomItem':
            PlayerModel.findOne({nickname: reqData.nickname}, (err, obj) => {
                if (obj) {
                    let partsArr = ['mast', 'cabins', 'oars', 'sails', 'hull', 'deck', 'wheel'];
                    obj.hangar.push(new ShipElement(Math.ceil(Math.random() * 5), partsArr[Math.floor(Math.random() * 7)]));
                    PlayerModel.updateOne({nickname: reqData.nickname}, obj, (err) => {
                        if (err) console.log(err)
                        else res.send({ship: obj.ship, hangar: obj.hangar})

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

