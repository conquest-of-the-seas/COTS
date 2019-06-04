const initialState = {}

export default function (state = initialState, action) {
    switch (action.type) {
        //todo
        case "INVALID_SESSION":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}