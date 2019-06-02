/** variable and constants below */
let mongoose = require('mongoose');
let {availableParameters, parArr} = require('./ShipModel');
const {ParameterModifier} = require('./PlayerModel');
let crewMemberModelSchema = mongoose.Schema({
    number: {
        type: Number
    },
    member: {
        type: {}
    }
});

let CrewMemberModel = mongoose.model("CrewMember", crewMemberModelSchema);

// array of names used for unnamed crew members must end with ' ' name = nameArray[i] + rank
const nameArray = ['The unnamed ', 'Mystic ', 'The invincible ', 'Random ', 'Shitty '];

//pirate type names
const typeArray = ["captain", "qm", "navigator", "boatswain", "carpenter", "surgeon", "gunner", "rigger", "abs"];



//used for creating a new crew member
let number = 0;
calculateNumber();

/** variable and constants above */
/** classes below */
class SkillEffect {
    constructor(parameter, multiplier) {
        this.param = parameter;
        this.multiplier = multiplier;
    }
}

class Skill {
    constructor(shortName, untrainable = false) {
        this.name = this.getName(shortName);
        this.untrainable = untrainable;
        this.shortName = shortName
        this.value = 0;
        this.effect = this.getAffectedParameters(shortName)
    }

    getName(shortName) {
        switch (shortName) {
            case "strategic":
                return "Strategic skill";
            case "charm":
                return "Charm";
            case "voice":
                return "Voice strength";
            case "travel":
                return "Travel time";
            case "natureLandmarks":
                return "Knowledge of Nature Landmarks";
            case "sight":
                return "Sight";
            case "sailsHandling":
                return "Sails handling";
            case "carpentry":
                return "Carpentry skill";
            case "repairsCompleted":
                return "Total repairs completed";
            case "medical":
                return "Knowledge of medical bullshit";
            case "peopleHealed":
                return "Total people healed";
            case "gunpowder":
                return "Knowledge of gunpowder use";
            case "aim":
                return "Aim skill";
            case "strength":
                return "Strength";
            case "swing":
                return "Rope swing skills";
        }
    }

    getAffectedParameters(shortName) {
        switch (shortName) {
            case "strategic":
                return new SkillEffect('moral', 1.001);
            case "charm":
                return new SkillEffect('moral', 1.001);
            case "voice":
                return new SkillEffect('delay', 0.99);
            case "travel":
                return new SkillEffect('force', 1.00025);
            case "natureLandmarks":
                return new SkillEffect('sailors', 1.01);
            case "sight":
                return new SkillEffect('force', 1.01);
            case "sailsHandling":
                return new SkillEffect('windEff', 1.002);
            case "carpentry":
                return new SkillEffect('regen', 1.01);
            case "repairsCompleted":
                return new SkillEffect('regen', 1.02);
            case "medical":
                return new SkillEffect('moral', 1.01);
            case "peopleHealed":
                return new SkillEffect('moral', 1.02);
            case "gunpowder":
                return new SkillEffect('accuracy', 1.0033);
            case "aim":
                return new SkillEffect('accuracy', 1.01);
            case "strength":
                return new SkillEffect('force', 1.005);
            case "swing":
                return new SkillEffect('windEff', 1.002)
        }
    }
}

// Skills object
skillArray = {
    strategic: new Skill("strategic"),
    charm: new Skill("charm"),
    voice: new Skill("voice"),
    travel: new Skill("travel", true),
    natureLandmarks: new Skill("natureLandmarks"),
    sight: new Skill("sight"),
    sailsHandling: new Skill("sailsHandling"),
    carpentry: new Skill("carpentry"),
    repairsCompleted: new Skill("repairsCompleted", true),
    medical: new Skill("medical"),
    peopleHealed: new Skill("peopleHealed", true),
    gunpowder: new Skill("gunpowder"),
    aim: new Skill("aim", true),
    strength: new Skill("strength"),
    swing: new Skill("swing"),
}


class CrewMember {
    constructor(rank, name, age = 0) {
        // Id is automatically created
        if (name) this.name = name;
        else this.name = nameArray[Math.floor(Math.random() * nameArray.length)] + rank;
        this.shortRank = rank;
        this.rank = this.getRank(rank);
        this.age = age;
        this.number = number;
        this.skills = this.setSkills();
        let thisMember = new CrewMemberModel();
        thisMember.member = this;
        thisMember.number = number;
        number++;
        thisMember.save().then((obj) => {
            calculateNumber()
        }, (err) => console.log(err))
    }

    // Pirate types
    setSkills() {
        switch (this.shortRank) {
            case "captain":
                return [
                    skillArray.strategic,
                    skillArray.charm,
                    skillArray.voice,
                    skillArray.travel
                ];
            case "qm":
                return [
                    skillArray.strategic,
                    skillArray.charm,
                    skillArray.travel
                ];
            case "navigator":
                return [
                    skillArray.natureLandmarks,
                    skillArray.sight,
                    skillArray.travel
                ];
            case "boatswain":
                return [
                    skillArray.sailsHandling,
                    skillArray.travel
                ];
            case "carpenter":
                return [
                    skillArray.carpentry,
                    skillArray.repairsCompleted
                ];
            case "surgeon":
                return [
                    skillArray.medical,
                    skillArray.peopleHealed
                ];
            case "gunner":
                return [
                    skillArray.gunpowder,
                    skillArray.aim
                ];
            case "rigger":
                return [
                    skillArray.strength,
                    skillArray.swing,
                    skillArray.travel
                ];
            case "abs":
                return [
                    skillArray.strength,
                    skillArray.travel
                ]
        }
    };

    getRank(rank) {
        switch (rank) {
            case 'captain':
                return "Captain";
            case 'qm':
                return "Quarter Master";
            case 'navigator':
                return 'Navigator';
            case 'boatswain':
                return 'Boatswain';
            case 'carpenter':
                return 'Carpenter';
            case 'surgeon':
                return 'Surgeon';
            case 'gunner':
                return 'Master Gunner';
            case 'rigger':
                return 'Rigger';
            case 'abs':
                return "A.B.S."
        }
    }
}


/** classes above */
/** functions below */

function defaultCrew() {
    let arr = [];
    arr.push(
        new CrewMember('captain'),
        new CrewMember("qm"),
        new CrewMember("boatswain"),
        new CrewMember("abs"),
        new CrewMember("abs"),
        new CrewMember("abs"),
        new CrewMember("abs"),
        new CrewMember("abs"),
        new CrewMember("abs"),
    )
    return arr
}

function calculateNumber() {
    CrewMemberModel.find({}, (err, arr) => {
        number = arr.length
    })
}

function multiplyParameters(playerParams, crew) {
    //playerParams is the Player.parameters object
    /** Player.parameters = {
            accuracy: new GlobalParameter(10, 80),
            windEff: new GlobalParameter(10, 80),
            oars: new GlobalParameter(4),
            regen: new GlobalParameter(0, 1),
            sailors: new GlobalParameter(4),
            cargo: new GlobalParameter(50, 250),
            canons: new GlobalParameter(4),
            offset: new GlobalParameter(30,70),

            delay: new GlobalParameter(10,10),
            force: new GlobalParameter(2),
            moral: new GlobalParameter(2)
        }*/
    // A GlobalParameter(default, max=420)  has .addModifier(Parameter) function

    /** crew is array of CrewMembers
     a CrewMember has array of Skills
     a Skill has value and effect
     the effect has .param and .multiplier
     the value is the power of the .multiplier
     */

    let allParams = parArr.length
    //clears old parameters
    for (let i = 0; i < allParams; i++) {
        playerParams[parArr[i].shortName].modifiers.crewMember = [];
    }
    //recalculates current parameters
    for (let i = 0; i < crew.length; i++) {
        let member = crew[i];
        member.skills.map((s, i) => {
            let modifier = new ParameterModifier(s);
            playerParams[s.effect.param].modifiers.crewMember.push(modifier);
        })
    }


}

/** functions above */
/** export below */

module.exports = {
    defaultCrew: defaultCrew,
    CrewMember: CrewMember,
    CrewMemberModel: CrewMemberModel,
    skillArrayObj: skillArray,
    pirateTypeNames: typeArray,
    Skill: Skill,
    multiplyParameters: multiplyParameters
};

/**export above */
/** commented out stuff below*/