const initialState = {
    errMsg: '',
    conditions: {},
    //32x32
    map: undefined,
    shipLocation: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_CONDITIONS_MAP':
        case "TRAVEL_ISLAND_MAP":
        case "INVALID_SESSION":
            console.log('reducer')
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}