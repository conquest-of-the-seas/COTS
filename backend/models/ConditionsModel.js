var mongoose = require('mongoose');

//Setting up the Schema and the db columns
let conditionsModelSchema = mongoose.Schema({
    windDirection:{
        type: Number,
        required: true
    },
    windSpeed:{
        type: Number,
        required: true
    },
    waveSize:{
        type: Number,
        required: true
    },
    pirates:{
        type: Number,
        required: true
    },
    temperature:{
        type: Number,
        required: true
    },
    visibility:{
        type: Number,
        required: true,
        default: 4,
    },
    day:{
        type: Number,
        required: true,
    }
});

// Exporting the object
let conditionsModel = module.exports = mongoose.model("ConditionsModel", conditionsModelSchema);

const defWatherData = {
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