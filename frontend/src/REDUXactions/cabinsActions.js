import {fetchRequest} from "./mainFunctions";

export const getPlayerCabins = (fetchBody = {}) => dispatch => {
    let action = 'GET_PLAYER_CABINS';
    fetchBody = Object.assign({action:action}, fetchBody)
    fetchRequest('cabins', fetchBody,dispatch,json => {
        dispatch({
            type: action,
            payload: json
        })
    })
}

export const addRandomCabins = (fetchBody = {}) => dispatch => {
    let action = 'ADD_RANDOM_CABINS';
    fetchBody = Object.assign({action:action}, fetchBody)
    fetchRequest('cabins', fetchBody,dispatch,json => {
        dispatch({
            type: action,
            payload: json
        })
    })
}