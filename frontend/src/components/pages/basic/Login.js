import React, {Component} from 'react';
import RequestModel from "../../RequestModel";


export default class Login extends RequestModel {
    constructor() {
        super()
        this.state = {
            nickname: '',
            password: '',
            errMsg: ''
        }
    }

    login() {
        this.fetchRequest('login',{nickname: this.state.nickname, password: this.state.password})
    }

    handleChange(input, value) {
        let obj = {};
        obj[input] = value;
        this.setState(obj)
    }

    render() {

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

