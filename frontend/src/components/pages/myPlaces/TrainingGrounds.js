import React, {Component} from 'react';
import Redirect from "react-router/es/Redirect";
import connect from "react-redux/es/connect/connect";
import * as actionFunctions from "../../../REDUXactions/myPlaces/trainingGroundsActions";

 class TrainingGrounds extends Component {
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
        if (this.props.trainingState.redirect==='/login') window.location.pathname = '/login'
        else if (this.props.trainingState.redirect) return <Redirect to={this.props.trainingState.redirect}/>;
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
    trainingState: state.trainingState
})

export default connect(mapStateToProps, actionFunctions)(TrainingGrounds)