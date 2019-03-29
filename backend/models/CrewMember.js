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
function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index == 0 ? match.toLowerCase() : match.toUpperCase();
    });
}

// declaring the skill object
class Skill {
    constructor(name, untrainable) {
        this.name = name;
        this.untrainable = untrainable;
        this.shortName = camelize(name);
        this.value = 0;
    }
}

// Skills object
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

// Pirate types
const pirateTypes = {  
    "Captain":[  
       skillArray.strategicSkill,
       skillArray.charm,
       skillArray.voiceStrength,
       skillArray.travelTime
    ],
    "Quarter Master":[  
       skillArray.strategicSkill,
       skillArray.charm,
       skillArray.travelTime
    ],
    "Navigator":[  
       skillArray.knowledgeOfNatureLandmarks,
       skillArray.sight,
       skillArray.travelTime
    ],
    "Boatswain":[  
       skillArray.sailsHandling,
       skillArray.travelTime
    ],
    "Carpenter":[  
       skillArray.carpentrySkill,
       skillArray.totalRepairsCompleted
    ],
    "Surgeon":[  
       skillArray.knowledgeOfMedicalBullshit,
       skillArray.totalPeopleHealed
    ],
    "Master Gunner":[  
       skillArray.knowledgeOfGunpowderUse,
       skillArray.aimSkill
    ],
    "Rigger":[  
       skillArray.strength,
       skillArray.ropeSwingSkills,
       skillArray.travelTime
    ],
    "A.B.S.":[  
       skillArray.strength,
       skillArray.travelTime
    ]
};

// Declaring the CrewMember class
class CrewMember {
    constructor(name, rank, age){
        // Id is automatically created
        this.name = name;
        this.rank = rank;
        this.age = age;
        this.skills = skillArray[name];
    }
}

module.exports = {
    crewMember: CrewMember,
    pirateTypes: pirateTypes,
    skillArrayObj: skillArray,
    skill: Skill
};