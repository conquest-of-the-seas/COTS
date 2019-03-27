var mongoose = require('mongoose');

//Setting up the Schema and the db columns
let articleModelSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    number:{
        type: Number,
        required: true
    },
    author:{
        type:String,
        default: 'Admin'
    }
});

// Exporting the object
let Article = module.exports = mongoose.model("Article", articleModelSchema);