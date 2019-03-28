import React, {Component} from 'react';


export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            nickname: '',
            password: ''
        }
    }

    register() {
        fetch(`http://${window.location.hostname}:4004/login`, {
            method: "POST",
            data: this.state
        }).then(res => res.text()).then(t => console.log(t))
    }

    handleChange(input, value) {
        let obj = {};
        obj[input] = value
        this.setState(obj)
    }

    render() {

        return (
            <div>
                <label htmlFor='nick'>Nickname:</label>
                <input id='nick' type='text'
                       onChange={(e) => this.handleChange('nickname', e.target.value).bind(this)}/>
                <label htmlFor='pw'>Password:</label>
                <input id='pw' type='password'
                       onChange={(e) => this.handleChange('password', e.target.value).bind(this)}/>
                <input type="button" onClick={this.register.bind(this)}/>
            </div>
        );
    }
}

