import {fetchRequest} from "../.partials/mainFunctions";


export const updateShipLocation = (dispatch, json) => {
    let action = "UPDATE_LOCATION_MAP";
    dispatch({
        type: action,
        payload: json
    })
}

export const getConditions = (fetchBody = {}) => dispatch => {
    let action = 'GET_CONDITIONS_MAP'
    fetchBody = Object.assign({action: action}, fetchBody)
    fetchRequest('map', fetchBody, dispatch, (json) => displayTravel(json, dispatch))
}


export const travelToIsland = (islandData = {}) => dispatch => {
    let action = 'TRAVEL_ISLAND_MAP';
    islandData = Object.assign({action: action}, islandData);

    fetchRequest('map', islandData, dispatch, (json) => displayTravel(json, dispatch))
}
let timeout
export const clearTimeouts = () => dispatch => {
    clearTimeout(timeout)
}


function tinyRound(number) {

    if (Math.abs(Math.round(number) - number) < 0.025) return Math.round(number)
    else return number
}


function displayTravel(json, dispatch) {
    clearTimeout(timeout)
    console.log(json)
    if (json.shipLocation.travelData) {
        let travel = () => {
            json.shipLocation.cords[0] = json.shipLocation.cords[0] - json.shipLocation.travelData.turnDelta[0];
            json.shipLocation.cords[1] = json.shipLocation.cords[1] - json.shipLocation.travelData.turnDelta[1];
            if (tinyRound(json.shipLocation.cords[0]) === json.shipLocation.travelData.end[0] && tinyRound(json.shipLocation.cords[1]) === json.shipLocation.travelData.end[1]) {
                json.shipLocation.cords[0] = tinyRound(json.shipLocation.cords[0])
                json.shipLocation.cords[1] = tinyRound(json.shipLocation.cords[1])
            }
            else timeout = setTimeout(travel, json.shipLocation.updateRate)
            updateShipLocation(dispatch, json)
        }
        setTimeout(travel, json.shipLocation.updateRate)
    }
}