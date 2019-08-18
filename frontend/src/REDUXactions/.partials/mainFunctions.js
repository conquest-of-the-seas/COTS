import cookie from 'react-cookies';
import {getUA} from 'react-device-detect'

export function fetchRequest(path, body = {}, dispatch, callback) {
    cookie.save('ua',getUA)
    fetch(`http://${window.location.hostname}:3004/${path}`, {
        method: "post",
        credentials: 'include',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).then(j => {
        console.log(j);
       // if (j.session) {
       //     dispatch({
       //         type: "INVALID_SESSION",
       //         payload: {redirect: '/login'}// todo make it better !!!
       //     });
       //     return cookie.remove('cots');
       // }
        dispatch({
            type: body.action,
            payload: j
        })
        if (callback) callback(j);
    })
}

export function getRequest(path, action,dispatch, callback) {
    cookie.save('ua',getUA)
    fetch(`http://${window.location.hostname}:3004/${path}`, {
        method: "get",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).then(j => {
        console.log(j);

        dispatch({
            type: action,
            payload: j
        })
        if (callback) callback(j);
    })
}


export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}