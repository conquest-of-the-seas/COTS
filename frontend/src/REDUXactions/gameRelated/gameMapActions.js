import {fetchRequest} from "../.partials/mainFunctions";

export const getConditions = (fetchBody = {}) => dispatch => {
    let action = 'GET_CONDITIONS_MAP'
    fetchBody = Object.assign({action: action}, fetchBody)
    fetchRequest('map', fetchBody, dispatch, json => {
    })
}

export const travelToIsland = (islandData = {}) => dispatch => {
    let action = 'TRAVEL_ISLAND_MAP';
    islandData = Object.assign({action: action}, islandData);

    fetchRequest('map', islandData, dispatch, json => {
    })
}