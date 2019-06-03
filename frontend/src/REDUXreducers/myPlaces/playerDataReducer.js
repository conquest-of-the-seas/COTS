const initialState = {
    player: {},
    errMsg: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_PLAYER_DATA':
        case "INVALID_SESSION":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}