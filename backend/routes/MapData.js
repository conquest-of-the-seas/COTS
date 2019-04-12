var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
let timeModel = require('../models/TimeModel');
// Connecting to the Database
// Added { useNewUrlParser: true } because the old parser is going to be deprecated in newer versions
mongoose.connect("mongodb://localhost/CotSdb", {useNewUrlParser: true});
let db = mongoose.connection;

let map = JSON.parse(require('fs').readFileSync('./models/jsonSettings/map2.json', 'utf8'));
// Check connection to db
db.once("open", function () {
    console.log("Connected to MongoDb",);
});

// Check for db errors
db.on("error", function (err) {
    console.log(err);
});

// Bringing in model
let ConditionModel = require("../models/ConditionsModel")

const defaultOceanConditions = {
    /*wind direction can take any value (0-7)
    0 => -y (Up)
    1 => -y +x (Up-right)
    2 => +x (Right)
    3 => +x +y (Right-down)
    4 => +y (Down)
    5 => +y -x (Down-left)
    6 => -x (Left)
    7 => -x -y (Left-up)
     */
    windDirection: 0,
    /* wind speed = Squares per hour (0-20)*/
    windSpeed: 10,
    /* height of the wave in meters (0-20) */
    waveSize: 1,
    /*Pirates density (percentages per square) 0.5-5*/
    pirates: 0.5,
    /* temperature varies between (4-44) */
    temperature: 20,
    /* determines how far can you spot other ships (0-10) without upgrades*/
    visibility: 4
}


/* GET home page. */
router.get('/', (req, res, next) => {
    // Displaying raw data from the DB
    ConditionModel.findOne({day: timeModel.getCurrentDay()}, (err, obj) => {
        if (err) console.log(err);
        console.log(timeModel.getCurrentDay());


        res.send({conditions:obj,map:map});
    })

});

module.exports = router;

let createCondition = () => {
    console.log('creating condition')
    ConditionModel.find({}, (err, arr) => {
        if (err) console.log(err)
        let items = arr.length;
        if (timeModel.getCurrentDay() > items - 7) {
            let condition = new ConditionModel();
            let yesterday = arr[arr.length - 1] || defaultOceanConditions;
            let plusOrMinusArr = [];
            for (let i = 0; i < 5; i++) {
                let isPlus = Math.round(Math.random()) === 1;
                let num = (isPlus) ? (1) : (-1);
                plusOrMinusArr.push(num);
            }

            condition.windDirection = normaliseParameter(yesterday.windDirection, plusOrMinusArr[0], 0, 7);
            condition.windSpeed = normaliseParameter(yesterday.windSpeed, plusOrMinusArr[1], 0, 20);
            condition.waveSize = normaliseParameter(yesterday.waveSize, plusOrMinusArr[2], 0, 20, 0.25);
            condition.pirates = normaliseParameter(yesterday.pirates, plusOrMinusArr[3], 0.5, 5, 0.05);
            condition.temperature = normaliseParameter(yesterday.temperature, plusOrMinusArr[4], 4, 44);
            condition.visibility = 4;
            condition.day = items;

            if (items < timeModel.getCurrentDay() + 7) setTimeout(createCondition, 1000);
            condition.save().then((err, obj) => {
                if (err) console.log(err);
                console.log(obj)
                console.log('New Conditions generated')
            });
        }

        function normaliseParameter(ydParam, pom, minValue, maxValue, step = 1) {
            let param = ydParam + pom * step;
            if (param === minValue - step) param = maxValue;
            if (param === maxValue + step) param = minValue;
            return param
        }
    })
}
createCondition()
setInterval(createCondition, 1000 * 60 * 60 * 24);

