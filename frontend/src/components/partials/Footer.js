import React, {Component} from 'react';

import actionFunctions from "../../REDUXactions/.partials/footerActions";//todo add component actions
import connect from "react-redux/es/connect/connect";


//todo change component name
class Footer extends Component {
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
    footerState: state.footerState
})

//todo add action functions to

export default connect(mapStateToProps, actionFunctions)(Footer)