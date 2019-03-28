import React, {Component} from 'react';
import {
    GiArcheryTarget,
    GiWindsock,
    GiWoodCanoe,
    GiCannon,
    GiSwimfins,
    GiCardboardBox,
    GiHumanPyramid,
    GiHealthIncrease
} from 'react-icons/gi'

import shipImg from '../../images/shipLayout.png'


export default class Hangar extends Component {
    constructor() {
        super()
        this.state = {
            ship: {},
            hangar: []

        }
    }

    componentWillMount() {
        fetch(`http://${window.location.hostname}:4004/hangar`).then(res => res.json()).then(j => {
            this.setState(j);
            console.log(j)
        })
    }


    setIcon(paramName) {
        switch (paramName) {
            case 'Cannon Accuracy':
                return <GiArcheryTarget/>;
            case "Wind Force Efficiency":
                return <GiWindsock/>;
            case 'Cannon Count':
                return <GiCannon/>;
            case 'Oars Count':
                return <GiSwimfins/>;
            case "Maximum Ship Cargo":
                return <GiCardboardBox/>;
            case 'Maximum Sailors Count':
                return <GiHumanPyramid/>;
            case 'Hull Damage Regeneration':
                return <GiHealthIncrease/>;
            default:
                return <GiWoodCanoe/>;
        }
    }


    createItemHolder(item, type) {
        if (item) {
            if (type) item.type = type;
            let primaryIcon = this.setIcon(item.primary.name);
            let secondaryIcon = this.setIcon(item.secondary.name);

            return (<div className={'holder '}>
                <img src={`/images/partsImages/${item.type}Tier${item.tier}.png`}/><br/>
                type: {item.type}<br/>

                {primaryIcon} {item.primary.displayString}<br/>
                {secondaryIcon} {item.secondary.displayString}<br/>
            </div>)
        }
    }

    render() {

        let items = this.state.hangar.map((item, index) => {
            return (<div className={'col-3'} key={index + 'item'}>
                {this.createItemHolder(item)}
            </div>)
        })

        return (
            <div className={'container'}>
                <div className={'ship row'}>
                    <div className={'col-12 row usedParts'}>
                        <div className={'col-6'}>  {this.createItemHolder(this.state.ship.sails, 'sails')} </div>
                        <div className={'col-6'}>  {this.createItemHolder(this.state.ship.mast, 'mast')} </div>
                    </div>
                    <div className={'col-2 usedParts'}>
                        {this.createItemHolder(this.state.ship.wheel, 'wheel')}
                    </div>
                    <div className={'col-8 usedParts'}>
                        <img src={shipImg}/>
                    </div>
                    <div className={'col-2 usedParts'}>
                        {this.createItemHolder(this.state.ship.cabins, 'cabins')}
                        {this.createItemHolder(this.state.ship.sails, 'sails')}
                    </div>
                    <div className={'col-12 row usedParts'}>
                        <div className={'col-6'}> {this.createItemHolder(this.state.ship.hull, 'hull')} </div>
                        <div className={'col-6'}> {this.createItemHolder(this.state.ship.deck, 'deck')} </div>
                    </div>
                </div>
                <div className={'row'}>
                    {items}
                </div>
            </div>
        );
    }
}

