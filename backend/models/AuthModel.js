/** variable and constants below */
let cryptoJS = require("crypto-js");
const secretKey = 'This Is My Secret Key';

/** variable and constants above */
/** classes below */


/** classes above */
/** functions below */

function createCookie(nickname, id) {
    let jsonObj = {
        nickname: nickname,
        timeStamp:Date.now().toString(),
        id: id,
    }
    let jsonStr = JSON.stringify(jsonObj);
    let cookie = cryptoJS.AES.encrypt(jsonStr,secretKey);    
    return cookie.toString();
}

function decryptCookie(cookie){

    let jsonObj;
    try{
        let bytes = cryptoJS.AES.decrypt(cookie, secretKey);
        let jsonStr = bytes.toString(cryptoJS.enc.Utf8);
        jsonObj = JSON.parse(jsonStr);
    }
    catch(e){
        console.log('Invalid Cookie received');
    }
    return jsonObj;
}

function compareCookies(cookie1,cookie2){
    //todo
}

/** functions above */
/** export below */

module.exports = {
    createCookie:createCookie,
    decryptCookie:decryptCookie
};

/**export above */
/** commented out stuff below*/