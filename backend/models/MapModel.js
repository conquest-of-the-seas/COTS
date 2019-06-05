/** variable and constants below */
let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/CotSdb");
let timeModel = require('../models/TimeModel');
let fs = require('fs');

/** variable and constants above */
/** classes below */

class IslandUsageData {
    constructor(type) {
        this.setup(type)
    }

    setup(type) {

    }
}

class Building extends IslandUsageData {
    constructor(type) {
        super(type);
    }

    setup(type) {
        switch (type) {
            case 'pub':

                break;
            case 'watchTower':

                break;
            case 'docks':

                break;
            case 'assembly':

                break;
            case 'turret':

                break;
            case 'treasury':

                break;
            case 'factionHQ':

                break;
            case 'monument':

                break;
            case 'refinery':

                break;
            case 'sawmill':

                break;
            case 'warehouse':

                break;
            case 'stoneware':

                break;
            case 'barn':

                break;
            case 'refrigerator':

                break;
            case '':

                break;
        }
    }
}

class Resource extends IslandUsageData {
    constructor(type) {
        super(type)
    }

    setup(type) {
        this.type = type;
        this.level = 1;
        this.multiplier = 1;
        this.storage = 0;
        this.maxStorage = 1000;
        switch (type) {
            case 'stone':
                this.gain = 5;
                this.multiplier = 0.995;
                break;
            case 'wood':
                this.gain = 10;
                this.multiplier = 0.992;
                break;
            case 'food':
                this.gain = 15;
                this.multiplier = 0.99;
                break;
            case 'gold':
                this.gain = 1;
                this.multiplier = 0.999;
                break;
            case 'metal':
                this.gain = 3;
                this.multiplier = 0.998;
                break;
            case 'island':
                this.type = 'none';
                this.gain = 0;
                this.multiplier = 1;
                break;

        }
        this.production = this.gain;
    }
}

class Island {
    constructor(cords, resource) {
        this.setName();
        this.cords = cords;
        this.setDefaultOwner();
        this.resource = new Resource(resource);
        this.buildings = [];
    }

    isWithin(number, bottom, top) {
        return (number >= bottom && number <= top)
    }

    setDefaultOwner() {
        if (this.isWithin(this.cords[0], 0, 5) && this.isWithin(this.cords[1], 0, 5)) this.owner = 'democrats';
        else if (this.isWithin(this.cords[0], 26, 31) && this.isWithin(this.cords[1], 0, 5)) this.owner = 'communists';
        else if (this.isWithin(this.cords[0], 0, 5) && this.isWithin(this.cords[1], 26, 31)) this.owner = 'anarchists';
        else if (this.isWithin(this.cords[0], 26, 31) && this.isWithin(this.cords[1], 26, 31)) this.owner = 'capitalists';
        else this.owner = 'none'
    }

    setName() {
        let nameArr = ['Huios', 'Muios', 'Fuios', 'Duios', 'Isloa', 'Maslo', 'Seno', 'Gorko', 'Deibos', 'Sereios', 'Pikos', 'Amfetos', 'Kozaldin', 'Genos', 'Sretoes'];
        let titleArr = ['The island of ', 'Deep ', 'Dry ', 'Hot ', 'Stoned ', 'Lost island of ', 'Old ', 'New ', 'Crazy ', 'Lonely ', 'Swampy '];
        this.name = titleArr[Math.floor(Math.random() * titleArr.length)] + nameArr[Math.floor(Math.random() * nameArr.length)];
    }
}

class World {
    constructor(name) {
        this.name = name;
        this.map = {}
    }

}


/** classes above */
/** functions below */

fs.readFile('./jsonSettings/map.json', 'utf8', (err, data) => {
    data = JSON.parse(data);
    let arr = [];
    for (let i = 0; i < 32; i++) {
        arr[i] = [];
        for (let k = 0; k < 32; k++) {
            if (data['key' + i][k]) arr[i][k] = new Island([i, k], data['key' + i][k].usage);
            else arr[i][k] = 0;
        }
    }
    fs.writeFile('./jsonSettings/map2.json', JSON.stringify(arr), function (err) {
        console.log(err)
    })
});



/** functions above */
/** export below */

module.exports = {};

/**export above */
/** commented out stuff below*/