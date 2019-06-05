import {fetchRequest,validateEmail} from "../.partials/mainFunctions";
import cookie from "react-cookies";

export const registerPlayer = (state) => dispatch => {
    let action = "DISPLAY_ERR_MSG"
    let isValid = true;
    if (state.password !==state.repPw) {
        isValid = false;
        dispatch({type:action,payload:{errMsg: "Passwords don't match"}})
    }
    else if (!validateEmail(state.email)) {
        isValid = false;
        dispatch({type:action,payload:{errMsg: "Invalid e-mail"}})
    }
    
    if (isValid) {
        action = 'PLAYER_REGISTER';
        let regObj = {
            nickname: state.nickname,
            password: state.password,
            faction: state.faction,
            email: state.email
        }
        fetchRequest('register', regObj,dispatch,json => {
        })
    }

}


export const changeField = (field,event) => dispatch => {
    console.log('changing')
    //todo use bot protection!!!
    let action = 'CHANGE_FIELD_REGISTER';
    dispatch({
        type: action,
        payload: {field:field,value:event.target.value}
    })
}
