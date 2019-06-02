import {fetchRequest} from "./mainFunctions";

export const getPlayerTraining = (fetchBody = {}) => dispatch => {
    let action = 'GET_PLAYER_CABINS';
    fetchBody = Object.assign({action:action}, fetchBody)
    fetchRequest('cabins', fetchBody,dispatch,json => {
        dispatch({
            type: action,
            payload: json
        })
    })
}


export const addRandomTraining = (fetchBody = {}) => dispatch => {
    let action = 'ADD_RANDOM_CABINS';
    fetchBody = Object.assign({action:action}, fetchBody)
    fetchRequest('cabins', fetchBody,dispatch,json => {
        dispatch({
            type: action,
            payload: json
        })
    })
}
export const trainCrewMember = (fetchBody = {}) => dispatch => {
    let action = 'CREW_MEMBER_TRAIN';
    fetchBody = Object.assign({action:action}, fetchBody)
    fetchRequest('train', fetchBody,dispatch,json => {
        dispatch({
            type: action,
            payload: json
        })
    })
}