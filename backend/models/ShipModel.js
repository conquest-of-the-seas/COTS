var mongoose = require('mongoose');

//Setting up the Schema and the db columns
let ShipElementSchema = mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    element: {
        type: {},
        required: true
    }
});

let ShipElementModel = mongoose.model("ShipElement", ShipElementSchema);


let number = 0;

calculateNumber()

function calculateNumber() {
    ShipElementModel.find({}, (err, arr) => {
        number = arr.length
    })
}

const parArr = [
    {
        name: 'Cannon Accuracy',
        max: [2, 4, 7, 10, 15],
        min: [0, 2, 4, 7, 10],
        measuringUnit: '%'
    }, {
        name: 'Wind Force Efficiency',
        max: [2, 3, 4, 6, 9],
        min: [0, 2, 3, 4, 6],
        measuringUnit: '%'
    }, {
        name: 'Hull Damage Regeneration',
        max: [0.05, 0.1, 0.15, 0.25, 0.4],
        min: [0, 0.05, 0.1, 0.15, 0.25],
        measuringUnit: '% per hour'
    }, {
        name: 'Cannon Count',
        max: [3, 5, 8, 11, 15],
        min: [0, 3, 5, 8, 11],
        measuringUnit: '',
        isInteger: true
    }, {
        name: 'Oars Count',
        max: [5, 8, 11, 15, 20],
        min: [0, 5, 8, 11, 15],
        measuringUnit: '',
        isInteger: true
    }, {
        name: 'Maximum Sailors Count',
        max: [2, 4, 7, 10, 15],
        min: [0, 2, 4, 7, 10],
        measuringUnit: '',
        isInteger: true
    }, {
        name: 'Maximum Ship Cargo',
        max: [10, 20, 35, 60, 90],
        min: [0, 10, 20, 35, 60],
        measuringUnit: 'm³',
    }];

class Parameter {

    constructor(tier) {
        this.tier = tier;
        this.parameterData = parArr[Math.floor(Math.random() * parArr.length)];
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

    updateDisplayString() {
        this.displayString = 'Increase ' + this.name + ' by ' + this.value + ' ' + this.measuringUnit;
    }

}

class ShipElement {


    constructor(tier, type) {
        this.number = number;
        this.type = type;
        this.tier = tier;
        this.primary = new Parameter(tier);
        this.secondary = new Parameter(tier);
        let thisElement = new ShipElementModel();
        thisElement.element = this;
        thisElement.number = number;
        number++;
        thisElement.save().then((obj) => {
            calculateNumber()
        },(err)=>console.log(err))
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

//used for getting the number of the element
async function createShipElement(tier, type) {
    let se = new ShipElementModel();
    await ShipElementModel.find({}, (err, arr) => {
        let items = arr.length;
        se.number = items;
        se.element = new ShipElement(tier, type)
        se.save().then(() => console.log('New Ship Element Created')).catch((err) => {
            console.log('Failed creating ship element.')
        });
    })
    console.log('awaiting')
    return se.element

}


module.exports = {
    Ship: Ship,
    ShipElement: ShipElement,
    ShipElementModel: ShipElementModel,
    parameter: Parameter,
    parArr: parArr
};