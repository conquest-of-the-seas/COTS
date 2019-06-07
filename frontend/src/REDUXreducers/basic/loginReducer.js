const initialState = {
    nickname: '',
    password: '',
    errMsg: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'PLAYER_LOGIN':
        case "INVALID_SESSION":
            return {
                ...state,
                ...action.payload
            }
        case 'CHANGE_FIELD_LOGIN':
            state[action.payload.field] =action.payload.value;
            return state;
        default:
            return state;
    }
}