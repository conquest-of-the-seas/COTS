import React, {Component} from 'react';
import RequestModel from "../../RequestModel";
import Redirect from "react-router/es/Redirect";

export default class Player extends RequestModel {
    constructor() {
        super()
        this.state = {
            player: {},
            errMsg: ''
        }
    }

    componentWillMount() {
        this.fetchRequest('player', {action: 'get'})
    }

    componentDidMount() {

    }


    render() {
        if (this.state.errMsg==='/login') return <Redirect to={'/login'}/>
        let params = this.state.player.parameters;
        if (params) {
            return (
                <div className={''}>
                    accuracy: {params.accuracy.value}<br/>
                    windEff: {params.windEff.value}<br/>
                    oars: {params.oars.value}<br/>
                    regen: {params.regen.value}<br/>
                    sailors: {params.sailors.value}<br/>
                    cargo: {params.cargo.value}<br/>
                    canons: {params.canons.value}<br/>
                    offset: {params.offset.value}<br/>
                    delay: {params.delay.value}<br/>
                    moral: {params.moral.value}<br/>
                    force: {params.force.value}
                </div>
            );
        }
        else return ('fetching')

    }
}

