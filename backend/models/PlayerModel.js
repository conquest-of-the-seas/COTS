var mongoose = require('mongoose');
let Ship = require('./ShipModel');

//Setting up the Schema and the db columns
let playerModelSchema = mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    number: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        default: 1,
    },
    exp: {
        type: Number,
        default: 0,
    },
    timePlayed: {
        type: Number,
        default: 0
    },
    registerDate: {
        type: Number,
    },
    faction: {
        type: String,
        required: true,
    },
    lastSeen: {
        type: Number,
    },
    ips: {
        type: [],
        default: []
    },
    shouts: {
        type: [],
        default: []
    },
    hangar:{
        type:[],
        default: []
    },
    newspaper: {
        type: {}
    },
    ship: {
        type: Ship
    },
    crew: {
        type: [],
        default: []
    }
});

// Exporting the object
let Player = module.exports = mongoose.model("Player", playerModelSchema);