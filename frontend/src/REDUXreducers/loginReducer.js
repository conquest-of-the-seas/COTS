

const initialState =  {
    nickname: '',
    password: '',
    errMsg: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'PLAYER_LOGIN':
        case "INVALID_SESSION":
            return{
                ...state,
                items: action.payload
            }

        default:
            return state;
    }
}