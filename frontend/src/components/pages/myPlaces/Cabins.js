import React, {Component} from 'react';
import RequestModel from "../../RequestModel";

export default class Cabins extends RequestModel {
    constructor() {
        super()
        this.state = {
            crew: [],
            errMsg: ''
        }
    }

    componentWillMount() {
        this.fetchRequest('cabins', {action: 'get'})
    }

    componentDidMount() {

    }


    addRandom() {

        this.fetchRequest('cabins', {action: 'addMeRandomItem'})
    }

    createItemHolder(crewmember) {
        let skills = crewmember.skills.map((s, i) => {
            return (<div key={'skill' + i}>
                {s.name}: {s.value}
            </div>)
        })
        return (<div className={'holder'}>
            {crewmember.name}<br/>
            {crewmember.rank}<br/>
            {skills}
        </div>)
    }


    render() {
        let crew = this.state.crew.map((cm, i) => {
            return <div className={'col-2'} key={'cm' + i}>{this.createItemHolder(cm)}</div>
        })

        return (
            <div className={''}>
                {this.state.errMsg}
                <div className={'crew row'}>
                    {crew}
                </div>

                <button onClick={this.addRandom.bind(this)}>Add Random</button>
            </div>
        );
    }
}

