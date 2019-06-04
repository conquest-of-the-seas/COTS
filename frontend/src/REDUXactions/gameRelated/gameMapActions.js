import {fetchRequest} from "../.partials/mainFunctions";

export const getConditions = (fetchBody = {}) => dispatch => {
    let action = 'GET_CONDITIONS_MAP'
    fetchBody = Object.assign({action: action}, fetchBody)
    fetchRequest('map', fetchBody, dispatch, json => {
        dispatch({type: action, payload: json})
    })
}


export const changeField = (field, event) => dispatch => {
    
    let action = 'CHANGE_FIELD_LOGIN';
    dispatch({
        type: action,
        payload: {field: field, value: event.target.value}
    })
}

