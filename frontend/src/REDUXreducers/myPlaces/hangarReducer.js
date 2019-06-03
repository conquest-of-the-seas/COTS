const initialState = {
    ship: {},
    hangar: [],
    canvHeight: 478,
    canvWidth: 600,
    errMsg: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_PLAYER_HANGAR':
        case 'USE_ITEM_HANGAR':
        case 'ADD_RANDOM_HANGAR':
        case "INVALID_SESSION":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}