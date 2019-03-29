import React, {Component} from 'react';


export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            nickname: '',
            password: '',
            errMsg: ''
        }
    }

    login() {
        fetch(`http://${window.location.hostname}:4004/login`, {
            method: "POST",
            body: JSON.stringify({nickname: this.state.nickname, password: this.state.password}),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(j => {
            if (j.errMsg) this.setState(j);
            else localStorage.setItem('nickname',j.nickname);

        })
    }

    handleChange(input, value) {
        let obj = {};
        obj[input] = value
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
                <input type="button" onClick={this.login.bind(this)}/>
            </div>
        );
    }
}

