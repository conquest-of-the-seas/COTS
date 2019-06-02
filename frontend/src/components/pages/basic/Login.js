import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {Redirect} from 'react-router-dom';
import cookie from "react-cookies";
import {loginPlayer} from "../../../REDUXactions/loginActions";

class Login extends Component {
    constructor() {
        super()
        this.state = {
            nickname: '',
            password: '',
            errMsg: ''
        }
    }

    componentWillUnmount(){
        delete this
    }
    login() {
        this.props.loginPlayer({nickname: this.state.nickname, password: this.state.password})
    }

    handleChange(input, value) {
        let obj = {};
        obj[input] = value;
        this.setState(obj);
        console.log('log')
    }

    render() {
        if (cookie.load('cots')) return <Redirect to={'/'}/>

        return (
            <div>
                {this.state.errMsg}
                <label htmlFor='nick'>Nickname:</label>
                <input id='nick' type='text'
                       onChange={(e) => this.handleChange('nickname', e.target.value)}/>
                <label htmlFor='pw'>Password:</label>
                <input id='pw' type='password'
                       onChange={(e) => this.handleChange('password', e.target.value)}/>
                <input type="button" value={'Log in'} onClick={this.login.bind(this)}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loginState: state.loginState
})

export default connect(mapStateToProps, {loginPlayer})(Login)