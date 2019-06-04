const initialState = {
    errMsg: '',
    conditions: {},
    //32x32
    map: undefined,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_CONDITIONS_MAP':
        case "INVALID_SESSION":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}