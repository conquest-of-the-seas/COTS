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


export default class Hangar extends Component {
    constructor() {
        super()
        this.state = {
            crew: [],
            errMsg: ''
        }
    }

    componentWillMount() {

        fetch(`http://${window.location.hostname}:4004/cabins`, {
            method: "post",
            body: JSON.stringify({
                action: 'get',
                nickname: localStorage.getItem('nickname'),
            }),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json())
            .then(j => {
                console.log(j);
                this.setState(j);
            })
    }

    componentDidMount() {

    }


    addRandom() {
        fetch(`http://${window.location.hostname}:4004/cabins`, {
            method: "post",
            body: JSON.stringify({
                action: 'addMeRandomItem',
                nickname: localStorage.getItem('nickname'),
            }),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(j => {
            this.setState(j);
        })
    }

    createItemHolder(crewmember) {
        let skills = crewmember.skills.map((s, i) => {
            return (<div>
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
            return <div key={i}>{this.createItemHolder(cm)}</div>
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

