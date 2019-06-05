import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {Redirect} from 'react-router-dom';
import cookie from "react-cookies";
import * as actionFunctions from "../../../REDUXactions/basic/loginActions";

class Login extends Component {
    constructor() {
        super();
    }

    render() {
        if (cookie.load('cots')) return <Redirect to={'/'}/>

        return (
            <div style={{textAlign:'center'}}>
                <h1>Log In</h1>
                {this.props.loginState.errMsg}<br/>
                <label htmlFor='nick'>Nickname:</label><br/>
                <input id='nick' type='text'
                       onChange={(e) => this.props.changeField('nickname', e)}/><br/>
                <label htmlFor='pw'>Password:</label><br/>
                <input id='pw' type='password'
                       onChange={(e) => this.props.changeField('password', e)}/><br/>
                <input type="button" value={'Log in'} onClick={()=> this.props.loginPlayer({nickname: this.props.loginState.nickname, password: this.props.loginState.password})}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loginState: state.loginState
})

export default connect(mapStateToProps, actionFunctions)(Login)