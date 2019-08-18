import React, {Component} from 'react';
import cookie from "react-cookies";
import * as actionFunctions from "../../../REDUXactions/basic/indexPageActions";
import connect from "react-redux/es/connect/connect";
import Login from './Login'
import Register from './Register'

//todo change component name
class IndexPage extends Component {


    //todo add component functionality

    render() {

    var toggleBetweenForms = function toggleBetweenForms(e) {
        var callerButton = e.currentTarget;
        
        // TODO [GM]: fix function

        var loginForm = document.getElementById("login-form");
        var registerForm = document.getElementById("register-form");

        if(loginForm.style.display === "none" && callerButton.textContent === "Login") {
            loginForm.style.display = "block";
            registerForm.style.display = "none";
        } else if(registerForm.style.display === "none" && callerButton.textContent === "Register") {
            registerForm.style.display = "block";
            loginForm.style.display = "none";
        }
    };

    //todo add component view
        if (cookie.load('cots')){
            return <div className="cots-index-container"> Welcome!! </div>
        }
        else {
            return (
                <div className="cots-index-container">
                    <div className="cots-index-options-wrapper">
                        <button className="cots-button" onClick={(e) => toggleBetweenForms(e)}>Login</button>
                        <button className="cots-button" onClick={(e) => toggleBetweenForms(e)}>Register</button>
                    </div>
                    <Login/>
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