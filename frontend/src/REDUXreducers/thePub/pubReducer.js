const initialState = {
    status: 'new',
    isWhite: false,
    board: [[15, 12, 13, 17, 18, 13, 12, 15],
        [11, 11, 11, 11, 11, 11, 11, 11],
        [],
        [],
        [],
        [],
        [21, 21, 21, 21, 21, 21, 21, 21],
        [25, 22, 23, 27, 28, 23, 22, 25]],
    possibleMoves: [],
    selectedFigure: []
}

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