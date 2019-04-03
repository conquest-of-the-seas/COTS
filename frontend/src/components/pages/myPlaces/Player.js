import React, {Component} from 'react';

export default class Player extends Component {
    constructor() {
        super()
        this.state = {
            player: {},
            errMsg: ''
        }
    }

    componentWillMount() {

        fetch(`http://${window.location.hostname}:4004/player`, {
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
                this.setState({player: j});
            })
    }

    componentDidMount() {

    }


    render() {

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

