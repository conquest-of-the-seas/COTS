const initialState = {
    title: '',
    text: '',
    errMsg: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "POST_ARTICLE":
        case "INVALID_SESSION":
            return {
                ...state,
                ...action.payload
            }
        case "CHANGE_FIELD_ARTICLE_EDITOR":
            state[action.payload.field] = action.payload.value;
            return state;
        default:
            return state;
    }
}