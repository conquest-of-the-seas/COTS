/** variable and constants below */
var mongoose = require('mongoose');


/** variable and constants above */
/** classes below */

class GlobalParameter {
    //contains data only about one of the 7 parameters
    constructor(def, max = 420) {
        this.default = def;
        this.maxValue = max;
        this.value = def;
        //stores modifiers based on origin
        this.modifiers = {
            shipElement: [], //ParameterModifier array
            crewMember: [] //ParameterModifier array
        }
    }

}

class ParameterModifier {
    constructor(param) {
        this.source = param;
        this.setTypeValue()
    }

    setTypeValue() {
        if (this.source.parameterData !== undefined) {
            this.value = this.source.value;
            this.type = 'shipElement';
        }
        else {
            this.value = Math.pow(this.source.effect.multiplier, this.source.value);
            this.type = 'crewMember';
        }
    }
}

/** classes above */
/** functions below */

/** functions above */
/** export below */
//Setting up the Schema and the db columns
let playerModelSchema = mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    cookie:{type:String},
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
    hangar: {
        type: [],
        default: []
    },
    newspaper: {
        type: {}
    },
    ship: {
        type: {}
    },
    crew: {
        type: [],
        default: []
    },
    parameters: {
        type: {},
        default: {
            accuracy: new GlobalParameter(10, 80),
            windEff: new GlobalParameter(10, 80),
            oars: new GlobalParameter(4),
            regen: new GlobalParameter(0, 1),
            sailors: new GlobalParameter(4),
            cargo: new GlobalParameter(50, 250),
            canons: new GlobalParameter(4),
            offset: new GlobalParameter(30, 70),

            delay: new GlobalParameter(10, 10),
            force: new GlobalParameter(2),
            moral: new GlobalParameter(2)
        }
    }
});

module.exports = {
    PlayerModel: mongoose.model("Player", playerModelSchema),
    ParameterModifier: ParameterModifier,
    GlobalParameter: GlobalParameter
};

/**export above */
/** commented out stuff below*/