import React, {Component} from 'react';

export default class TrainingGrounds extends Component {
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

    trainSkill(skill,cm){
        console.log(skill);
        console.log(cm);
        fetch(`http://${window.location.hostname}:4004/train`, {
            method: "post",
            body: JSON.stringify({
                crewMember:cm,
                skill:skill,
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
            let trainButton
            if (!s.untrainable) trainButton =  <button onClick={()=>this.trainSkill(s,crewmember)}>Train</button>
            return (<div key={'skill'+i}>
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
        let crew = this.state.crew.map((cm, i) => {
            return <div className={'col-2'} key={'cm'+i}>{this.createItemHolder(cm)}</div>
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

