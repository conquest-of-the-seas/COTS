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

import shipImg from '../../../images/shipLayoutWithoutOars.png'
import RequestModel from "../../RequestModel";


export default class Hangar extends RequestModel {
    constructor() {
        super()
        this.state = {
            ship: {},
            hangar: [],
            canvHeight: 478,
            canvWidth: 600,
            errMsg: ''
        }
    }

    componentWillMount() {
        this.fetchRequest('hangar', {action: 'get'})
    }

    componentDidMount() {

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

    usePart(item) {
        this.fetchRequest('hangar', {
            action: 'use',
            item: item
        })
    }


    addRandom() {
        this.fetchRequest('hangar', {action: 'addMeRandomItem'})
    }

    createItemHolder(item, isUsed) {
        if (item) {
            let topPart;
            if (isUsed) {
                topPart = (<div style={{alignContent: "center"}}>
                    <img alt={isUsed} ref={item.type}
                         src={`/images/partsImages/${item.type}Tier${item.tier}.png`}/><br/>
                </div>)
            }
            else topPart = (<div className={'row'}>
                <div className={'col-6'}>
                    <img alt={item.type} src={`/images/partsImages/${item.type}Tier${item.tier}.png`}/><br/>
                </div>
                <div className="col-6">
                    <button onClick={() => this.usePart(item)}>Use</button>
                    <br/>
                    <button>Recycle</button>
                </div>
            </div>)
            let primaryIcon = this.setIcon(item.primary.name);
            let secondaryIcon = this.setIcon(item.secondary.name);

            return (<div className={'holder'}>
                {topPart}

                Tier {item.tier} {item.type} [#{item.number}]<br/>

                {primaryIcon} {item.primary.displayString}<br/>
                {secondaryIcon} {item.secondary.displayString}<br/>

            </div>)
        }
    }

    drawShip() {
        let canv = document.getElementById('shipLayout');
        let ctx = canv.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, this.state.canvWidth, this.state.canvHeight);
        ctx.drawImage(this.refs.ship, 0, 0, this.state.canvWidth, this.state.canvHeight);
        if (this.refs.oars) for (let i = 0; i < 6; i++) {
            ctx.drawImage(this.refs.oars, 22 + i * 60, this.state.canvHeight - 105);
        }
    }

    render() {
        console.log('rendering')
        let items = this.state.hangar.map((item, index) => {
            return (<div className={'col-3'} key={index + 'item'}>
                {this.createItemHolder(item)}
            </div>)
        })
        setTimeout(() => this.drawShip(), 200)
        return (
            <div className={''}>
                {this.state.errMsg}
                <div className={'ship row'}>
                    <div className={'col-12 row usedParts'}>
                        <div className={'col-6'}>  {this.createItemHolder(this.state.ship.sails, 'sails')} </div>
                        <div className={'col-6'}>  {this.createItemHolder(this.state.ship.mast, 'mast')} </div>
                    </div>
                    <div className={'col-2 usedParts'}>
                        {this.createItemHolder(this.state.ship.wheel, 'wheel')}
                        {this.createItemHolder(this.state.ship.cabins, 'cabins')}
                    </div>
                    <div className={'col-8 usedParts'}>
                        <canvas id={'shipLayout'} width={this.state.canvWidth} height={this.state.canvHeight}/>
                        <img src={shipImg} alt={'shipImg'} style={{display: 'none'}} ref={'ship'}/>
                    </div>
                    <div className={'col-2 usedParts'}>

                        {this.createItemHolder(this.state.ship.oars, 'oars')}
                    </div>
                    <div className={'col-12 row usedParts'}>
                        <div className={'col-6'}> {this.createItemHolder(this.state.ship.hull, 'hull')} </div>
                        <div className={'col-6'}> {this.createItemHolder(this.state.ship.deck, 'deck')} </div>
                    </div>
                </div>
                <div className={'row'}>
                    {items}
                </div>
                <button onClick={this.addRandom.bind(this)}>Add Random</button>
            </div>
        );
    }
}

