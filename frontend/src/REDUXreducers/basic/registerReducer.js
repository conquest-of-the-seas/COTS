const initialState = {
    nickname: '',
    password: '',
    repPw: '',
    email: '',
    faction: '',
    errMsg: "",
    redirect: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'PLAYER_REGISTER':
        case "INVALID_SESSION":
        case 'DISPLAY_ERR_MSG':
            return {
                ...state,
                ...action.payload
            }
        case 'CHANGE_FIELD_REGISTER':
            let newState = Object.assign({},state)
            newState[action.payload.field] =action.payload.value;
            return newState
        default:
            return state;
    }
}