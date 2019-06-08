var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
let timeModel = require('../models/TimeModel');
const {PlayerModel} = require("../models/PlayerModel");
let ConditionModel = require("../models/ConditionsModel")
const {findPlayerInDbAndCheckCookie} = require('../models/RequestModel');
// Connecting to the Database
// Added { useNewUrlParser: true } because the old parser is going to be deprecated in newer versions
mongoose.connect("mongodb://localhost/CotSdb", {useNewUrlParser: true});
let db = mongoose.connection;

let map = JSON.parse(require('fs').readFileSync('./models/jsonSettings/map2.json', 'utf8'));
// Check connection to db
db.once("open", function () {
    console.log("Connected to MongoDb for route MapData",);
    //todo once the DB loads foreach all players and start travel timer
});

// Check for db errors
db.on("error", function (err) {
    console.log(err);
});


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

let traveilingShips = {}
const timePerDistance = 60 * 1000 // ms from island to island
const updateRate = 2 * 1000// ms for interval

/* GET home page. */
router.post('/', (req, res, next) => {
    let reqData = req.body

    findPlayerInDbAndCheckCookie(req, res, (player) => {
        ConditionModel.findOne({day: timeModel.getCurrentDay()}, (err, conditions) => {
            if (err) {
                console.log(err);
            }
            switch (reqData.action) {
                case 'TRAVEL_ISLAND_MAP':

                    let dist = calcDist(player.shipLocation.cords, reqData.cords)
                    console.log(dist)
                    let travelData = {
                        current: player.shipLocation.cords,
                        end: reqData.cords
                    }
                    travelData.turnDelta = calcDeltaCords(travelData.current, travelData.end);
                    player.shipLocation = {
                        x: tinyRound(travelData.current[0]),
                        y: tinyRound(travelData.current[1]),
                        cords: travelData.current,
                        travelData: travelData,
                        updateRate: updateRate
                    }
                    if (traveilingShips[player._id]) clearInterval(traveilingShips[player._id]);
                    traveilingShips[player._id] = setInterval(() => {
                        travelData.current[0] = travelData.current[0] - travelData.turnDelta[0];
                        travelData.current[1] = travelData.current[1] - travelData.turnDelta[1];
                        console.log(travelData.current[0] + ' ; ' + travelData.current[1])
                        if (tinyRound(travelData.current[0]) === travelData.end[0] && tinyRound(travelData.current[1]) === travelData.end[1]) {
                            console.log('should clear')
                            clearInterval(traveilingShips[player._id])
                            player.shipLocation = {
                                x: tinyRound(travelData.current[0]),
                                y: tinyRound(travelData.current[1]),
                                cords: [tinyRound(travelData.current[0]),tinyRound(travelData.current[1])],
                                travelData: false,

                            }
                        }
                        else {
                            player.shipLocation = {
                                x: tinyRound(travelData.current[0]),
                                y: tinyRound(travelData.current[1]),
                                cords: [tinyRound(travelData.current[0]),tinyRound(travelData.current[1])],
                                travelData: travelData,
                                updateRate: updateRate
                            }
                        }
                        PlayerModel.updateOne({nickname: player.nickname}, player, (err) => {
                            if (err) console.log(err);
                        })

                    }, updateRate)
                    res.send({shipLocation: player.shipLocation, errMsg: 'Ship moved successful!'})


                    break;
                case'GET_CONDITIONS_MAP':
                    // Displaying raw data from the DB
                    res.send({conditions: conditions, map: map, shipLocation: player.shipLocation});
                    break;
                case "":
                    break;
                default:
                    break;
            }

        })


    });

});

module.exports = router;

function calcDist(start, end) {
    return Math.sqrt((Math.pow(start[0] - end[0], 2) + Math.pow(start[1] - end[1], 2)))
}

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

function calcDeltaCords(start, end) {
    let deltaX = start[0] - end[0];
    let deltaY = start[1] - end[1];
    let totalDist = calcDist(start, end);
    console.log(totalDist)
    let repeatInterval = totalDist * timePerDistance / updateRate
    let singleX = deltaX / repeatInterval;
    console.log(deltaX)
    let singleY = deltaY / repeatInterval;
    console.log(deltaY)
    return [singleX, singleY];
}

function tinyRound(number) {

    if (Math.abs(Math.round(number) - number) < 0.025) return Math.round(number)
    else {
        //console.log(Math.abs(Math.round(number) - number))
        return number
    }
}

createCondition()
setInterval(createCondition, 1000 * 60 * 60 * 24);

