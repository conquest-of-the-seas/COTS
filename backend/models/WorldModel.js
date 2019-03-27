var mongoose = require('mongoose');

//Setting up the Schema and the db columns
let worldModelSchema = mongoose.Schema({
    name: {
        type: String
    },
    map: {
        type: []
    },
    day: {
        type: Number
    },
    condition: {
        type: {}
    }
});

// Exporting the object
let World = module.exports = mongoose.model("World", worldModelSchema);