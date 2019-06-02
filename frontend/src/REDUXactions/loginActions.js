import {fetchRequest} from "./mainFunctions";

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
