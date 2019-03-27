var mongoose = require('mongoose');

//Setting up the Schema and the db columns
let islandModelSchema = mongoose.Schema({
    name: {
        type: String
    },
    coordinates: {
        type: []
    },
    owner: {
        type: Number
    },
    buildings: {
        type: []
    },
    resource: {
        type: String
    }
});

// Exporting the object
let IslandModel = module.exports = mongoose.model("IslandModel", islandModelSchema);