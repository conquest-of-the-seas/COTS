const initialState = {
    crew: [],
    errMsg: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_PLAYER_CABINS':
        case 'ADD_RANDOM_CABINS':
        case 'CREW_MEMBER_TRAIN':
        case "INVALID_SESSION":
            return {
                ...state,
                items: action.payload
            }

        default:
            return state;
    }
}