import cookie from 'react-cookies';

export function fetchRequest(path, additionalBody = {},dispatch, callback) {
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
        console.log(j);
        if (j.session) {
            dispatch({
                type: "INVALID_SESSION",
                payload: {redirect: '/login'}
            });
            return cookie.remove('cots');
        }
<<<<<<< HEAD
        console.log(j);
=======
   
>>>>>>> cb364a5c2a3da59aa33e98767229f23d4fb7d7b3
        if (j.cookie) {
            cookie.save('cots', j.cookie);
            j.cookie = true;
        }
        dispatch({
            type: additionalBody.action,
            payload: j
        })
        if (callback) callback(j);
    })
}

export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}