import React, {Component} from 'react';
import cookie from 'react-cookies'
import {Redirect} from 'react-router-dom'

class RequestModel extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('mounting')
    }

    componentWillUnmount() {
        console.log('unmounting')
    }

    fetchRequest(path, additionalBody = {}, callback) {
        let defaultBody = {
            cookie: cookie.load('cots')
        };
        let body = Object.assign({}, defaultBody, additionalBody);

        fetch(`http://${window.location.hostname}:4004/${path}`, {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(j => {
            if (j.session) {
                console.log('session')
                this.setState({redirect: '/login'});
                return cookie.remove('cots');
            }
            if (j.cookie) {
                cookie.save('cots', j.cookie);
                j.cookie = true;
            }
            this.setState(j);
            if (callback) callback(j);
        })
    }


}


export default RequestModel
