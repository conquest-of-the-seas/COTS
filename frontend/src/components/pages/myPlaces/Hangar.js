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
import Redirect from "react-router/es/Redirect";
import connect from "react-redux/es/connect/connect";
import * as actionFunctions from "../../../REDUXactions/myPlaces/hangarActions"


class Hangar extends Component {
    constructor() {
        super()
        this.state = {
            ship: {},
            hangar: [],
            canvHeight: 478,
            canvWidth: 600,
            errMsg: ''
        }
        this.timeout = undefined
    }


    componentDidMount() {
        this.props.getPlayerHangar()
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
        this.props.useItemHangar({
            item: item
        })
    }


    addRandom() {
        this.props.addRandomHangar()
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
        console.log(canv)
        ctx.fillRect(0, 0, this.props.hangarState.canvWidth, this.props.hangarState.canvHeight);
        ctx.drawImage(this.refs.ship, 0, 0, this.props.hangarState.canvWidth, this.props.hangarState.canvHeight);
        if (this.refs.oars) for (let i = 0; i < 6; i++) {
            ctx.drawImage(this.refs.oars, 22 + i * 60, this.props.hangarState.canvHeight - 105);
        }
    }

    render() {
        //if (this.props.hangarState.redirect==='/login') window.location.pathname = '/login'
         if (this.props.hangarState.redirect) return <Redirect to={this.props.hangarState.redirect}/>;
        console.log('rendering')
        console.log(this.props.hangarState)
        let items = this.props.hangarState.hangar.map((item, index) => {
            return (<div className={'col-3'} key={index + 'item'}>
                {this.createItemHolder(item)}
            </div>)
        })
        this.timeout = setTimeout(() => this.drawShip(), 200)
        return (
            <div className={''}>
                {this.props.hangarState.errMsg}
                <div className={'ship row'}>
                    <div className={'col-12 row usedParts'}>
                        <div
                            className={'col-6'}>  {this.createItemHolder(this.props.hangarState.ship.sails, 'sails')} </div>
                        <div
                            className={'col-6'}>  {this.createItemHolder(this.props.hangarState.ship.mast, 'mast')} </div>
                    </div>
                    <div className={'col-2 usedParts'}>
                        {this.createItemHolder(this.props.hangarState.ship.wheel, 'wheel')}
                        {this.createItemHolder(this.props.hangarState.ship.cabins, 'cabins')}
                    </div>
                    <div className={'col-8 usedParts'}>
                        <canvas id={'shipLayout'} width={this.props.hangarState.canvWidth}
                                height={this.props.hangarState.canvHeight}/>
                        <img src={shipImg} alt={'shipImg'} style={{display: 'none'}} ref={'ship'}/>
                    </div>
                    <div className={'col-2 usedParts'}>

                        {this.createItemHolder(this.props.hangarState.ship.oars, 'oars')}
                    </div>
                    <div className={'col-12 row usedParts'}>
                        <div
                            className={'col-6'}> {this.createItemHolder(this.props.hangarState.ship.hull, 'hull')} </div>
                        <div
                            className={'col-6'}> {this.createItemHolder(this.props.hangarState.ship.deck, 'deck')} </div>
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

const mapStateToProps = state => ({
    hangarState: state.hangarState
})

export default connect(mapStateToProps, actionFunctions)(Hangar)