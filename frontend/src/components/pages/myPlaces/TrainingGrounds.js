import React, {Component} from 'react';
import RequestModel from "../../RequestModel";
import Redirect from "react-router/es/Redirect";
import connect from "react-redux/es/connect/connect";
import {getPlayerTraining, addRandomTraining, trainCrewMember} from "../../../REDUXactions/trainingGroundsActions";

 class TrainingGrounds extends RequestModel {
    constructor() {
        super()
        this.state = {
            crew: [],
            errMsg: ''
        }
    }

    componentWillMount() {
      this.props.getPlayerTraining()
    }

    componentDidMount() {

    }

    addRandom() {
        this.props.addRandomTraining();
    }

    trainSkill(skill, cm) {
        this.props.trainCrewMember({
            crewMember: cm,
            skill: skill
        })
    }

    createItemHolder(crewmember) {
        let skills = crewmember.skills.map((s, i) => {
            let trainButton
            if (!s.untrainable) trainButton = <button onClick={() => this.trainSkill(s, crewmember)}>Train</button>
            return (<div key={'skill' + i}>
                {s.name}: {s.value} {trainButton}
            </div>)
        })
        return (<div className={'holder'}>
            {crewmember.name}<br/>
            {crewmember.rank}<br/>
            {skills}
        </div>)
    }


    render() {
        if (this.props.trainingState.errMsg==='/login') return <Redirect to={'/login'}/>
        let crew = this.props.trainingState.crew.map((cm, i) => {
            return <div className={'col-2'} key={'cm' + i}>{this.createItemHolder(cm)}</div>
        })

        return (
            <div className={''}>
                {this.props.trainingState.errMsg}
                <div className={'crew row'}>
                    {crew}
                </div>

                <button onClick={this.addRandom.bind(this)}>Add Random</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    trainingState: state.trainingState.items
})

export default connect(mapStateToProps, {getPlayerTraining, addRandomTraining, trainCrewMember})(TrainingGrounds)