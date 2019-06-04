import React, {Component} from 'react';

import Redirect from "react-router/es/Redirect";
import connect from "react-redux/es/connect/connect";
import * as actionFunctions from "../../../REDUXactions/myPlaces/cabinsActions";

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
        if (this.props.cabinsState.redirect==='/login') window.location.pathname = '/login'
        else if (this.props.cabinsState.redirect) return <Redirect to={this.props.cabinsState.redirect}/>;
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
export default connect(mapStateToProps, actionFunctions)(Cabins)
