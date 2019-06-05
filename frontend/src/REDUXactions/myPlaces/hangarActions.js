import {fetchRequest} from "../.partials/mainFunctions";

export const getPlayerHangar = (fetchBody = {}) => dispatch => {
    let action = 'GET_PLAYER_HANGAR';
    fetchBody = Object.assign({action:action}, fetchBody)
    fetchRequest('hangar', fetchBody,dispatch,json => {
    })
}

export const useItemHangar = (fetchBody = {}) => dispatch => {
    let action = 'USE_ITEM_HANGAR';
    fetchBody = Object.assign({action:action}, fetchBody)
    fetchRequest('hangar', fetchBody,dispatch,json => {
    })
}


export const addRandomHangar = (fetchBody = {}) => dispatch => {
    let action = 'ADD_RANDOM_HANGAR';
    fetchBody = Object.assign({action:action}, fetchBody)
    fetchRequest('hangar', fetchBody,dispatch,json => {
    })
}