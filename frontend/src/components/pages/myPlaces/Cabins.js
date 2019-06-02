import React, {Component} from 'react';

import Redirect from "react-router/es/Redirect";
import connect from "react-redux/es/connect/connect";
import {addRandomCabins, getPlayerCabins} from "../../../REDUXactions/cabinsActions";

class Cabins extends Component {
    constructor() {
        super()
        this.state = {
            crew: [],
            errMsg: ''
        }
    }

    componentWillMount() {
        this.props.getPlayerCabins()
    }

    componentDidMount() {

    }


    addRandom() {
        this.props.addRandomCabins()
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
        if (this.state.redirect) return <Redirect to={this.state.redirect}/>;
        let crew = this.props.cabinsState.crew.map((cm, i) => {
            return <div className={'col-2'} key={'cm' + i}>{this.createItemHolder(cm)}</div>
        })

        return (
            <div className={''}>
                {this.props.cabinsState.errMsg}
                <div className={'crew row'}>
                    {crew}
                </div>

                <button onClick={this.addRandom.bind(this)}>Add Random</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cabinsState: state.cabinsState
})

export default connect(mapStateToProps, {getPlayerCabins, addRandomCabins})(Cabins)