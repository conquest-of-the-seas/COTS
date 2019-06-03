const initialState = {
    crew: [],
    errMsg: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_PLAYER_CABINS':
        case 'ADD_RANDOM_CABINS':
        case "INVALID_SESSION":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}