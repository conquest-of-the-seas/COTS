let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let timeModel = require('../models/TimeModel');
let {ShipElement, updateParameters} = require('../models/ShipModel');
let {PlayerModel} = require("../models/PlayerModel");

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

            PlayerModel.findOne({nickname: reqData.nickname}, (err, obj) => {
                if (err) console.log(err);
                if (obj) res.send(obj);
                else res.send({errMsg: 'Invalid session!'})
            })
            break;
    }


})

module.exports = router;
