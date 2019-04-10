import React, {Component} from 'react';
import cookie from 'react-cookies'

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

    fetchRequest(path, additionalBody = {},callback) {
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
            if (j.session) return cookie.remove('cots');
            console.log(j)
            if (j.cookie) cookie.save('cots', j.cookie);
            delete j.cookie;
            this.setState(j);
            if (callback) callback();
        })
    }
}


export default RequestModel
