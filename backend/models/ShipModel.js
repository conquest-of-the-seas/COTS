/** variable and constants below */

const mongoose = require('mongoose');
const {ParameterModifier} = require('./PlayerModel');
const ShipElementSchema = mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    element: {
        type: {},
        required: true
    }
});
const ShipElementModel = mongoose.model("ShipElement", ShipElementSchema);
const elementStrings = ['mast', 'cabins', 'oars', 'sails', 'hull', 'deck', 'wheel'];
const parArr = [
    {
        name: 'Cannon Accuracy',
        shortName: 'accuracy',
        max: [2, 4, 7, 10, 15],
        min: [0, 2, 4, 7, 10],
        measuringUnit: '%'
    }, {
        name: 'Wind Force Efficiency',
        shortName: "windEff",
        max: [2, 3, 4, 6, 9],
        min: [0, 2, 3, 4, 6],
        measuringUnit: '%'
    }, {
        name: 'Hull Damage Regeneration',
        shortName: "regen",
        max: [0.05, 0.1, 0.15, 0.25, 0.4],
        min: [0, 0.05, 0.1, 0.15, 0.25],
        measuringUnit: '% per hour'
    }, {
        name: 'Cannon Count',
        shortName: "canons",
        max: [3, 5, 8, 11, 15],
        min: [0, 3, 5, 8, 11],
        measuringUnit: '',
        isInteger: true
    }, {
        name: 'Oars Count',
        shortName: "oars",
        max: [5, 8, 11, 15, 20],
        min: [0, 5, 8, 11, 15],
        measuringUnit: '',
        isInteger: true
    }, {
        name: 'Maximum Sailors Count',
        shortName: "sailors",
        max: [2, 4, 7, 10, 15],
        min: [0, 2, 4, 7, 10],
        measuringUnit: '',
        isInteger: true
    }, {
        name: 'Maximum Ship Cargo',
        shortName: "cargo",
        max: [10, 20, 35, 60, 90],
        min: [0, 10, 20, 35, 60],
        measuringUnit: 'm³',
    }, {
        name: 'Offset reduction',
        shortName: "offset",
        max: [4, 7, 10, 15, 20],
        min: [0, 4, 7, 10, 15],
        measuringUnit: '%',
    }, {
        name: 'Forward Force',
        shortName: "force",
        measuringUnit: 'sq/h',
    },
    {
        name: 'Reaction Delay',
        shortName: "delay",
        measuringUnit: 'min',
    }, {
        name: 'Crew Moral',
        shortName: "moral",
        measuringUnit: '',
    }
];
const availableParameters = parArr.filter(a => a.min !== undefined).length;

//used for creating a new ship
let number = 0;
calculateNumber();

/** variable and constants above */
/** classes below */

class ElementParameter {

    constructor(tier) {
        this.tier = tier;
        this.parameterData = parArr[Math.floor(Math.random() * availableParameters)];
        this.name = this.parameterData.name;
        this.value = this.setParameterValue();
        this.measuringUnit = this.parameterData.measuringUnit;
        this.displayString = 'Increase ' + this.name + ' by ' + this.value + ' ' + this.measuringUnit;
    }

    setParameterValue() {
        let deltaValue = this.parameterData.max[this.tier - 1] - this.parameterData.min[this.tier - 1];
        let randomValue = Math.random();
        let finalValue = deltaValue * randomValue + this.parameterData.min[this.tier - 1];
        if (this.parameterData.isInteger) finalValue = Math.round(finalValue);
        else finalValue = Number(finalValue.toFixed(2));
        return finalValue;
    }

    //todo get this out of the class
    updateDisplayString() {
        this.displayString = 'Increase ' + this.name + ' by ' + this.value + ' ' + this.measuringUnit;
    }

}

class ShipElement {


    constructor(tier, type) {
        this.number = number;
        this.type = type;
        this.tier = tier;
        this.primary = new ElementParameter(tier);
        this.secondary = new ElementParameter(tier);
        let thisElement = new ShipElementModel();
        thisElement.element = this;
        thisElement.number = number;
        number++;
        thisElement.save().then((obj) => {
            calculateNumber()
        }, (err) => console.log(err))
    }
}

class Ship {
    constructor(id) {
        this.number = id;
        this.mast = new ShipElement(1, 'mast');
        this.cabins = new ShipElement(1, 'cabins');
        this.oars = new ShipElement(1, 'oars');
        this.sails = new ShipElement(1, 'sails');
        this.hull = new ShipElement(1, 'hull');
        this.deck = new ShipElement(1, 'deck');
        this.wheel = new ShipElement(1, 'wheel');

    }
}

class ShipLocation {
    constructor(faction) {
        this.x = 0;
        this.y = 0;
        this.setLocation(faction)
    }

    setLocation(faction) {
        switch (faction) {
            case "capitalists":
                this.x = 30;
                this.y = 29;
                break;
            case "democrats":
                this.x = 1;
                this.y = 1;
                break;
            case "communists":
                this.x = 29;
                this.y = 1;
                break;
            case "anarchists":
                this.x = 2;
                this.y = 29;
                break;
            default:
                break
        }

    }
}

/** classes above */
/** functions below */
function calculateNumber() {
    ShipElementModel.find({}, (err, arr) => {
        number = arr.length
    })
}

function updateParameters(playerParams, ship) {

    //playerParams is the PlayerData.parameters object, ship is the Ship class from above
    /** PlayerData.parameters = {
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
    // A ShipParameter(default, max=420)  has .addModifier(Parameter) function

    //clears old parameters
    for (let i = 0; i < availableParameters; i++) {
        playerParams[parArr[i].shortName].modifiers.shipElement = [];
    }
    //recalculates current parameters
    for (let i = 0; i < 7; i++) {
        let primeParam = ship[elementStrings[i]].primary;
        let primeShortName = primeParam.parameterData.shortName;
        addShipParameterModifier(primeParam, playerParams[primeShortName]);

        let secondParam = ship[elementStrings[i]].secondary;
        let secondShortName = secondParam.parameterData.shortName;
        addShipParameterModifier(secondParam, playerParams[secondShortName]);
    }

    for (let i = 0; i < parArr.length; i++) {
        setShipParameterValue(playerParams[parArr[i].shortName])
    }
}

function addShipParameterModifier(param, globalPar) {
    //called by function updateParameters
    let modifier = new ParameterModifier(param);
    globalPar.modifiers[modifier.type].push(modifier);

}

function setShipParameterValue(globalPar) {
    //called by function addShipParameterModifier
    let elementModifierSum = 0;
    globalPar.modifiers.shipElement.map(a => {
        elementModifierSum += a.value;
    })
    // Ship Elements can modify to certain extend, crew members modifications are limitless
    let maxElementModification = globalPar.maxValue - globalPar.default;
    if (elementModifierSum > maxElementModification) elementModifierSum = maxElementModification;

    let crewModifierSum = 1;
    globalPar.modifiers.crewMember.map(a => {
        crewModifierSum *= a.value;
    })


    globalPar.value = (globalPar.default + elementModifierSum) * crewModifierSum;
}

/** functions above */
/** export below */

module.exports = {
    Ship: Ship,
    ShipElement: ShipElement,
    ShipElementModel: ShipElementModel,
    ShipLocation:ShipLocation,
    ElementParameter: ElementParameter,
    parArr: parArr,
    updateParameters: updateParameters,
    addShipParameterModifier: addShipParameterModifier,
    setShipParameterValue: setShipParameterValue,
    availableParameters: availableParameters
};

/**export above */
/** commented out stuff below*/

//used for getting the number of the element
/*async function createShipElement(tier, type) {
    let se = new ShipElementModel();
    await ShipElementModel.find({}, (err, arr) => {
        let items = arr.length;
        se.number = items;
        se.element = new ShipElement(tier, type)
        se.save().then(() => console.log('New Ship Element Created')).catch((err) => {
            console.log('Failed creating ship element.')
        });
    })
    console.log('awaiting');
    return se.element
}*/

