let mongoose = require('mongoose');

//Setting up the Schema and the db columns
let crewMemberModelSchema = mongoose.Schema({
    number: {
        type: Number
    },
    member: {
        type: {}
    }
});

let CrewMemberModel = mongoose.model("CrewMember", crewMemberModelSchema);

// a simple normal case to camel case converter function
function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index == 0 ? match.toLowerCase() : match.toUpperCase();
    });
}

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

let number = 0;

calculateNumber()

function calculateNumber() {
    CrewMemberModel.find({}, (err, arr) => {
        number = arr.length
    })
}


// array of names used for unnamed crew members must end with ' ' name = nameArray[i] + rank
const nameArray = ['The unnamed ', 'Mystic ', 'The invincible ', 'Random ', 'Shitty '];

//pirate type names
const typeArray = ["Captain", "Quarter Master", "Navigator", "Boatswain", "Carpenter", "Surgeon", "Master Gunner", "Rigger", "A.B.S."];

// declaring the skill object
class Skill {
    constructor(name, untrainable = false) {
        this.name = capitalizeFirstLetter(name);
        this.untrainable = untrainable;
        this.shortName = camelize(name);
        this.value = 0;
    }
}

// Skills object
const skillArray = {
    strategicSkill: new Skill("strategic skill",),
    charm: new Skill("charm"),
    voiceStrength: new Skill("voice strength"),
    travelTime: new Skill("travel time", true),
    knowledgeOfNatureLandmarks: new Skill("knowledge of nature landmarks"),
    sight: new Skill("sight"),
    sailsHandling: new Skill("sails handling"),
    carpentrySkill: new Skill("carpentry skill"),
    totalRepairsCompleted: new Skill("total repairs completed", true),
    knowledgeOfMedicalBullshit: new Skill("knowledge of medical bullshit"),
    totalPeopleHealed: new Skill("total people healed", true),
    knowledgeOfGunpowderUse: new Skill("knowledge of gunpowder use"),
    aimSkill: new Skill("aim skill", true),
    strength: new Skill("strength"),
    ropeSwingSkills: new Skill("rope swing skills")
}

// Pirate types
const pirateTypes = {
    "Captain": [
        skillArray.strategicSkill,
        skillArray.charm,
        skillArray.voiceStrength,
        skillArray.travelTime
    ],
    "Quarter Master": [
        skillArray.strategicSkill,
        skillArray.charm,
        skillArray.travelTime
    ],
    "Navigator": [
        skillArray.knowledgeOfNatureLandmarks,
        skillArray.sight,
        skillArray.travelTime
    ],
    "Boatswain": [
        skillArray.sailsHandling,
        skillArray.travelTime
    ],
    "Carpenter": [
        skillArray.carpentrySkill,
        skillArray.totalRepairsCompleted
    ],
    "Surgeon": [
        skillArray.knowledgeOfMedicalBullshit,
        skillArray.totalPeopleHealed
    ],
    "Master Gunner": [
        skillArray.knowledgeOfGunpowderUse,
        skillArray.aimSkill
    ],
    "Rigger": [
        skillArray.strength,
        skillArray.ropeSwingSkills,
        skillArray.travelTime
    ],
    "A.B.S.": [
        skillArray.strength,
        skillArray.travelTime
    ]
};


// Declaring the CrewMember class
class CrewMember {
    constructor(rank, name, age = 0) {
        // Id is automatically created
        if (name) this.name = name;
        else this.name = nameArray[Math.floor(Math.random() * nameArray.length)] + rank;
        this.rank = rank;
        this.age = age;
        this.skills = pirateTypes[rank];
        let thisMember = new CrewMemberModel();
        thisMember.crewMember = this;
        thisMember.number = number;
        number++;
        thisMember.save().then((obj) => {
            calculateNumber()
        }, (err) => console.log(err))
    }
}

function defaultCrew() {
    let arr = [];
    arr.push(
        new CrewMember('Captain'),
        new CrewMember("Quarter Master"),
        new CrewMember("Boatswain"),
        new CrewMember("A.B.S."),
        new CrewMember("A.B.S."),
        new CrewMember("A.B.S."),
        new CrewMember("A.B.S."),
        new CrewMember("A.B.S."),
        new CrewMember("A.B.S."),
    )
    return arr
}


module.exports = {
    defaultCrew: defaultCrew,
    CrewMember: CrewMember,
    CrewMemberModel: CrewMemberModel,
    pirateTypes: pirateTypes,
    skillArrayObj: skillArray,
    pirateTypeNames: typeArray,
    skill: Skill
};