import React, {Component} from 'react';


export default class Register extends Component {
    constructor() {
        super()
        this.state = {
            nickname: '',
            password: '',
            repPw: '',
            email: '',
            faction: '',
            errMsg: ""
        }
    }

    register() {
        let isValid = true

        if (this.state.password !== this.state.repPw) {
            isValid = false
            this.setState({errMsg: "Passwords don't match"})
        }
        else if (!this.validateEmail(this.state.email)) {
            isValid = false
            this.setState({errMsg: "Invalid e-mail"})
        }
        else if (isValid) {
            fetch(`http://${window.location.hostname}:4004/register`, {
                method: "post",
                body: JSON.stringify({
                    nickname: this.state.nickname,
                    password: this.state.password,
                    faction: this.state.faction,
                    email: this.state.email
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => res.json()).then(j => {
                localStorage.setItem('nickname',j.nickname);
                this.setState(j)
            })
        }


    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleChange(input, value) {
        let obj = {};
        obj[input] = value;
        this.setState(obj)
    }

    render() {


        let factionInfo
        if (this.state.faction === 'capitalists') {
            factionInfo = (<div>
                <h2>Capitalists</h2>

                <h5>Short Description:</h5>
                One of the best things about this faction is the surplus of money. Players from this faction have lots
                of options to easily earn local currency, and the main problem is inflation of its currency on the
                global market. As a result trading with other factions may get harder in the future.

                <h5>Hierarchy:</h5>
                The faction leaders are changed weekly. The new leader is the player with most funds in the faction
                treasury. The leader has the chance to select 3 other players from the top 10 with most funds, who have
                almost equal leadership rights as him.

                <h5>Weaknesses:</h5>
                If this faction loses an important resource island, based on the currency inflation it may be impossible
                for them even to protect their main islands.

            </div>)
        }
        else if (this.state.faction === 'democrats') {
            factionInfo = (<div>
                <h2>Democrats</h2>

                <h5>Short Description:</h5>
                One of the best things about this faction is the equality of players. Players from this faction have the
                right to vote most of their leader actions. The problem here is the delayed reaction of this faction in
                times of war.

                <h5>Hierarchy:</h5>
                The faction leaders are elected monthly. The new leader is the player with most votes on the elections.
                Every player can candidate for a leader by simply donating currency to the faction treasury. There are
                also 10 congressmen, which have some of the leaders privileges, and can issue an impeach poll, to
                replace the leader.


                <h5>Weaknesses:</h5>
                The reaction speed of this faction is slower due to the polls issued every time the leader wants to take
                action. If the leader isn't active enough, this faction is doomed.

            </div>)
        }

        return (
            <div>
                <form>
                    <h4>{this.state.errMsg}</h4>
                    <label htmlFor='nick'>Nickname:</label><br/>
                    <input id='nick' type='text'
                           onChange={(e) => this.handleChange('nickname', e.target.value)}/><br/>
                    <label htmlFor='pw'>Password:</label><br/>
                    <input id='pw' type='password'
                           onChange={(e) => this.handleChange('password', e.target.value)}/><br/>
                    <label htmlFor='repPw'>Repeat password:</label><br/>
                    <input id='repPw' type='password'
                           onChange={(e) => this.handleChange('repPw', e.target.value)}/><br/>
                    <label htmlFor='email'>E-mail:</label><br/>
                    <input id='email' type='text'
                           onChange={(e) => this.handleChange('email', e.target.value)}/><br/>
                    <label htmlFor='fact'>Faction:</label><br/>
                    <select id='fact' defaultValue={''} onChange={(e) => this.handleChange('faction', e.target.value)}>
                        <option value='' disabled>Select Faction</option>
                        <option value="democrats">Democrats</option>
                        <option value="anarchists">Anarchists</option>
                        <option value="communists">Communists</option>
                        <option value="capitalists">Capitalists</option>
                    </select><br/>
                    {factionInfo}
                    <br/>
                    <input type="button" value={'register'} onClick={this.register.bind(this)}/>
                </form>
            </div>
        );
    }
}
