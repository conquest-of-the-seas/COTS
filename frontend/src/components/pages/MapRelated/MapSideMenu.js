import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import * as actionFunctions from "../../../REDUXactions/gameRelated/gameMapActions";

class MapSideMenu extends Component {

    constructor() {
        super()
        this.windDirections = ['⇑', '⇗', '⇒', '⇘', '⇓', '⇙', '⇐', '⇖']
    }

    capitaliseFirstLetter(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }

    render() {

        let selectedPreview
        if (this.props.selectedData) selectedPreview = <div>
            <p> Island Name: {this.props.selectedData.name}</p>
            <p> Coordinates: {this.props.selectedData.cords[0]}; {this.props.selectedData.cords[1]}</p>
            <p>Owner: {this.capitaliseFirstLetter(this.props.selectedData.owner)}</p>
            <p> Resource: {this.capitaliseFirstLetter(this.props.selectedData.resource.type)}</p>
            <p>
                {(this.props.selectedData.resource.type !== 'none') ? `Production: ${this.props.selectedData.resource.production.toFixed(2)} per hour ` : ''}
            </p>
            <p>
                {(this.props.selectedData.resource.type !== 'none') ? `Storage : ${this.props.selectedData.resource.storage}; Decay: ${(100 * (1 - this.props.selectedData.resource.multiplier)).toFixed(2)}% per hour` : ''}
            </p>
            <p> Distance from your ship: {this.props.distanceFromShip}</p>
            <input type={'button'} onClick={() => this.props.travelToIsland(this.props.selectedData)}
                   value={'Travel Here'}/>
        </div>
        
        
//todo explain onMouseOver, and add mouse over icon for users to try put the mouse over....
        let conditionsData = (<div>
            <p style={{fontSize: 25}}>Wind direction: {this.windDirections[this.props.conditions.windDirection]}
            </p>
            <p>Wind speed: {this.props.conditions.windSpeed} Chunks per hour</p>
            <p>Highest wave size: {this.props.conditions.waveSize} Meters </p>
            <p>Chance to meet pirates: {this.props.conditions.pirates}% per square traveled</p>
            <p>Temperature: {this.props.conditions.temperature} ℃</p>
            <p>Visibility: {this.props.conditions.visibility} Chunks</p>
        </div>)

        return (
            <div style={{
                padding: 10,
                position: 'absolute',
                right: 0,
                background: 'black',
                color: 'white',
                height: '100%',
                maxWidth: 300,
                width: '20vw',
                zIndex: 1000
            }}>
                {conditionsData}
                ---------------------------
                {selectedPreview}

            </div>
        );
    }
}

const mapStateToProps = state => ({
    conditions: state.gameMapState.conditions
})

export default connect(mapStateToProps, actionFunctions)(MapSideMenu);