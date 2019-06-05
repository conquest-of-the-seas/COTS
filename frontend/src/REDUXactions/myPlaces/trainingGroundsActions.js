import {fetchRequest} from "../.partials/mainFunctions";

export const getPlayerTraining = (fetchBody = {}) => dispatch => {
    let action = 'GET_PLAYER_CABINS';
    fetchBody = Object.assign({action:action}, fetchBody)
    fetchRequest('cabins', fetchBody,dispatch,json => {
    })
}


export const addRandomTraining = (fetchBody = {}) => dispatch => {
    let action = 'ADD_RANDOM_CABINS';
    fetchBody = Object.assign({action:action}, fetchBody)
    fetchRequest('cabins', fetchBody,dispatch,json => {
    })
}
export const trainCrewMember = (fetchBody = {}) => dispatch => {
    let action = 'CREW_MEMBER_TRAIN';
    fetchBody = Object.assign({action:action}, fetchBody)
    fetchRequest('train', fetchBody,dispatch,json => {
    })
}