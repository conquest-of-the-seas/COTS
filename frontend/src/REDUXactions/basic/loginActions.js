import {fetchRequest} from "../.partials/mainFunctions";

export const loginPlayer = (fetchBody = {}) => dispatch => {
    let action = 'PLAYER_LOGIN';
    fetchBody = Object.assign({action:action}, fetchBody)
    fetchRequest('login', fetchBody,dispatch,json => {
        // TODO: must refresh page in order cookie to be active
    })
}

export const changeField = (field,event) => dispatch => {
    console.log('changing')
    //todo use bot protection!!!
    let action = 'CHANGE_FIELD_LOGIN';
    dispatch({
        type: action,
        payload: {field:field,value:event.target.value}
    })
}