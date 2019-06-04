import React, {Component} from 'react';

import * as actionFunctions from "../../../REDUXactions/myPlaces/questsActions";
import connect from "react-redux/es/connect/connect";


//todo change component name
class Quests extends Component {
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
    questsState: state.questsState
})


export default connect(mapStateToProps, actionFunctions)(Quests)