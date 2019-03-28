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

// a simple normal case to camel case converter function
function toCamelCase(text){

}

// declaring the skill object
class Skill {
    constructor(name, untrainable){
            this.name = name,
            this.untrainable = untrainable;
            this.shortName = toCamelCase(name);
            this.value = 0;
        }
}

const skillArray = {
    strategicSkill: new Skill("strategic skill", false),
    charm: new Skill("charm", false),
    voiceStrength: new Skill("voice strength", false),
    travelTime: new Skill("travel time", true),
    knowledgeOfNatureLandmarks: new Skill("knowledge of nature landmarks", false),
    sight: new Skill("sight", false),
    sailsHandling: new Skill("sails handling", false),
    carpentrySkill: new Skill("carpentry skill", false),
    totalRepairsCompleted: new Skill("total repairs completed", true),
    knowledgeOfMedicalBullshit: new Skill("knowledge of medical bullshit", false),
    totalPeopleHealed: new Skill("total people healed", true),
    knowledgeOfGunpowderUse: new Skill("knowledge of gunpowder use", false),
    aimSkill: new Skill("aim skill", true),
    strength: new Skill("strength", false),
    ropeSwingSkills: new Skill("rope swing skills", false)
}

const pirateTypes = {
    "Captain": [ skillArray.strategicSkill, skillArray.charm, skillArray.voiceStrength, skillArray.travelTime ],
    "Quarter Master": [ skillArray.strategicSkill, skillArray.charm, skillArray.travelTime],
    "Navigator": [],
    "Boatswain": [],
    "Carpenter": [],
    "Surgeon": [],
    "Master Gunner": [],
    "Rigger": [],
    "A.B.S.": []
    };

// Declaring the CrewMember class
class CrewMember{

}

// Exporting the object
let CrewMember = module.exports = mongoose.model("CrewMember", crewMemberModelSchema);