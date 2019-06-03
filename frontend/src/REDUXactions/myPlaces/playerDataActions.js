import {fetchRequest} from "../.partials/mainFunctions";

export const getPlayerData = (fetchBody = {}) => dispatch => {
    let action = 'GET_PLAYER_DATA';
    fetchBody = Object.assign({action:action}, fetchBody)
    fetchRequest('player', fetchBody,dispatch,json => {
        dispatch({
            type: action,
            payload: json
        })
    })
}

