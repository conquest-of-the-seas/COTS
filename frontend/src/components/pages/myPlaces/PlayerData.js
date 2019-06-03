import React, {Component} from 'react';

import Redirect from "react-router/es/Redirect";
import * as actionFunctions from "../../../REDUXactions/myPlaces/playerDataActions";
import connect from "react-redux/es/connect/connect";

class PlayerData extends Component {
    constructor() {
        super()
        this.state = {
            player: {},
            errMsg: ''
        }
    }

    componentWillMount() {
       this.props.getPlayerData()
    }

    componentDidMount() {

    }


    render() {
        if (this.props.playerDataState.redirect==='/login') window.location.pathname = '/login'
        else if (this.props.playerDataState.redirect) return <Redirect to={this.props.playerDataState.redirect}/>;

        let params = this.props.playerDataState.player.parameters;
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

const mapStateToProps = state => ({
    playerDataState: state.playerDataState
})

export default connect(mapStateToProps, actionFunctions)(PlayerData)