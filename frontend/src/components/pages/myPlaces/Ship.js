import React, {Component} from 'react';

import * as actionFunctions from "../../../REDUXactions/myPlaces/shipActions";
import connect from "react-redux/es/connect/connect";


//todo change component name
class Ship extends Component {
    constructor(){
        super()
    }

    //todo add component functionality

    render() {
//todo add component view
        return (
            <div>
                PageTest
            </div>
        );
    }
}

//todo change names of variables
const mapStateToProps = state => ({
    shipState: state.shipState
})


export default connect(mapStateToProps, actionFunctions)(Ship)