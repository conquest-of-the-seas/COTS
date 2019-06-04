import {fetchRequest} from "../.partials/mainFunctions";

export const loginPlayer = (fetchBody = {}) => dispatch => {
    let action = 'PLAYER_LOGIN';
    fetchBody = Object.assign({action:action}, fetchBody)
    fetchRequest('login', fetchBody,dispatch,json => {
        dispatch({
            type: action,
            payload: json
        })
    })
}


export const changeField = (field,event) => dispatch => {
    
    //todo use bot protection!!!
    let action = 'CHANGE_FIELD_LOGIN';
    dispatch({
        type: action,
        payload: {field:field,value:event.target.value}
    })
}
