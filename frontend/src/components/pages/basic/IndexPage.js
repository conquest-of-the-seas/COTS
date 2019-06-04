import React, {Component} from 'react';
import cookie from "react-cookies";
import * as actionFunctions from "../../../REDUXactions/basic/indexPageActions";
import connect from "react-redux/es/connect/connect";
import Login from './Login'
import Register from './Register'

//todo change component name
class IndexPage extends Component {
    constructor(){
        super()
    }

    //todo add component functionality

    render() {
//todo add component view
        if (cookie.load('cots')){
            return <div> Welcome!! </div>
        }
        else {
            return (
                <div>
                    <Login/> <br/>
                    <Register/>
                </div>
            );
        }
    }
}

//todo change names of variables
const mapStateToProps = state => ({
    indexPageState: state.indexPageState
})


export default connect(mapStateToProps, actionFunctions)(IndexPage)