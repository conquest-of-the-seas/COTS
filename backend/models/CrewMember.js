var mongoose = require('mongoose');

//Setting up the Schema and the db columns
let crewMemberModelSchema = mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    rank: {
        type: Number
    },
    skills: {
        type: []
    },
    age: {
        type: Number
    }
});

// Exporting the object
let CrewMember = module.exports = mongoose.model("CrewMember", crewMemberModelSchema);