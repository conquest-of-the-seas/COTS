var mongoose = require('mongoose');

//Setting up the Schema and the db columns
let testModelSchema = mongoose.Schema({
    age:{
        type: Number,
        required: true
    }
});

// Exporting the object
let Test = module.exports = mongoose.model("Test", testModelSchema);