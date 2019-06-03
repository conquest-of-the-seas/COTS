import React, {Component} from 'react';

import * as actionFunctions from "../../../REDUXactions/thePub/statisticsActions";
import connect from "react-redux/es/connect/connect";


//todo change component name
class Statistics extends Component {
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
    statisticsState: state.statisticsState
})


export default connect(mapStateToProps, actionFunctions)(Statistics)