export const handleClick = (e, figId, state, socket) => dispatch => {
    let action = "CLICK_CHESS"
    let figureData = e.target.className.split(' ').map((n) => (n.length === 1) ? Number(n) : n);

    let sBoard = JSON.parse(JSON.stringify(state.board))

    let getSlotData = (slot, board = sBoard) => {
        console.log(slot)
        let data = {figure: board[slot[0]][slot[1]], noFigure: true};
        if (data.figure) {
            data.isWhite = data.figure < 20;
            data.noFigure = false;
        }

        return data
    }

    let displayMoves = (e, figId) => {
        let pMoves = []
        console.log(figureData);
        let name;
        let moves = []

        let horseLogic = (isWhite) => {
            moves = [
                [figureData[1] + 1, figureData[2] + 2],
                [figureData[1] - 1, figureData[2] + 2],
                [figureData[1] + 1, figureData[2] - 2],
                [figureData[1] - 1, figureData[2] - 2],
                [figureData[1] + 2, figureData[2] + 1],
                [figureData[1] - 2, figureData[2] + 1],
                [figureData[1] + 2, figureData[2] - 1],
                [figureData[1] - 2, figureData[2] - 1],
            ].filter(a => a[0] >= 0 && a[1] >= 0 && a[0] < 8 && a[1] < 8)

            for (let i = 0; i < moves.length; i++) {
                if (getSlotData(moves[i]).noFigure) pMoves.push(moves[i].join(';'))
                else if ((isWhite) ? (!getSlotData(moves[i]).isWhite) : (getSlotData(moves[i]).isWhite)) pMoves.push(moves[i].join(';'))
            }
        }

        let bishopLogic = (isWhite) => {

            for (let i = 1; i < 8 - figureData[1]; i++) {
                if (figureData[2] + i >= 8) break;
                let newMove = [figureData[1] + i, figureData[2] + i]
                let moveData = getSlotData(newMove);
                if (moveData.noFigure) moves.push(newMove);
                else if ((isWhite) ? (!moveData.isWhite) : (moveData.isWhite)) {
                    moves.push(newMove);
                    break;
                }
                else break
            }

            for (let i = 1; i < 8 - figureData[1]; i++) {
                if (figureData[2] - i < 0) break;
                let newMove = [figureData[1] + i, figureData[2] - i]
                let moveData = getSlotData(newMove);
                if (moveData.noFigure) moves.push(newMove);
                else if ((isWhite) ? (!moveData.isWhite) : (moveData.isWhite)) {
                    moves.push(newMove);
                    break;
                }
                else break
            }

            for (let i = -1; i >= -figureData[1]; i--) {
                if (figureData[2] - i >= 8) break;
                let newMove = [figureData[1] + i, figureData[2] - i]
                let moveData = getSlotData(newMove);
                if (moveData.noFigure) moves.push(newMove);
                else if ((isWhite) ? (!moveData.isWhite) : (moveData.isWhite)) {
                    moves.push(newMove);
                    break;
                }
                else break
            }

            for (let i = -1; i >= -figureData[1]; i--) {
                if (figureData[2] + i < 0) break;
                let newMove = [figureData[1] + i, figureData[2] + i]
                let moveData = getSlotData(newMove);
                if (moveData.noFigure) moves.push(newMove);
                else if ((isWhite) ? (!moveData.isWhite) : (moveData.isWhite)) {
                    moves.push(newMove);
                    break;
                }
                else break
            }

            for (let i = 0; i < moves.length; i++) pMoves.push(moves[i].join(';'))
        }

        let rookLogic = (isWhite) => {
            for (let i = 1; i < 8 - figureData[1]; i++) {
                let newMove = [figureData[1] + i, figureData[2]]
                let moveData = getSlotData(newMove);
                if (moveData.noFigure) moves.push(newMove);
                else if ((isWhite) ? (!moveData.isWhite) : (moveData.isWhite)) {
                    moves.push(newMove);
                    break;
                }
                else break
            }

            for (let i = -1; i >= -figureData[1]; i--) {
                let newMove = [figureData[1] + i, figureData[2]]
                let moveData = getSlotData(newMove);
                if (moveData.noFigure) moves.push(newMove);
                else if ((isWhite) ? (!moveData.isWhite) : (moveData.isWhite)) {
                    moves.push(newMove);
                    break;
                }
                else break
            }

            for (let i = 1; i < 8 - figureData[2]; i++) {
                let newMove = [figureData[1], figureData[2] + i]
                let moveData = getSlotData(newMove);
                if (moveData.noFigure) moves.push(newMove);
                else if ((isWhite) ? (!moveData.isWhite) : (moveData.isWhite)) {
                    moves.push(newMove);
                    break;
                }
                else break
            }

            for (let i = -1; i >= -figureData[2]; i--) {
                let newMove = [figureData[1], figureData[2] + i]
                let moveData = getSlotData(newMove);
                if (moveData.noFigure) moves.push(newMove);
                else if ((isWhite) ? (!moveData.isWhite) : (moveData.isWhite)) {
                    moves.push(newMove);
                    break;
                }
                else break
            }

            for (let i = 0; i < moves.length; i++) pMoves.push(moves[i].join(';'))
        }

        let kingLogic = (isWhite) => {
            moves = [
                [figureData[1] + 1, figureData[2]],
                [figureData[1] - 1, figureData[2]],
                [figureData[1] + 1, figureData[2] - 1],
                [figureData[1] - 1, figureData[2] - 1],
                [figureData[1] + 1, figureData[2] + 1],
                [figureData[1] - 1, figureData[2] + 1],
                [figureData[1], figureData[2] - 1],
                [figureData[1], figureData[2] + 1],
            ].filter(a => a[0] >= 0 && a[1] >= 0 && a[0] < 8 && a[1] < 8)

            for (let i = 0; i < moves.length; i++) {
                if (getSlotData(moves[i]).noFigure) pMoves.push(moves[i].join(';'))
                else if ((isWhite) ? (!getSlotData(moves[i]).isWhite) : (getSlotData(moves[i]).isWhite)) pMoves.push(moves[i].join(';'))
            }
        }

        switch (figId) {
            case 11:
                name = 'pawnWhite';

                moves = {
                    forward: [figureData[1] + 1, figureData[2]],
                    double: [figureData[1] + 2, figureData[2]],
                    left: [figureData[1] + 1, figureData[2] + 1],
                    right: [figureData[1] + 1, figureData[2] - 1]
                }

                if (getSlotData(moves.forward).noFigure) {
                    pMoves.push(moves.forward.join(';'));
                    if (getSlotData(moves.double).noFigure && figureData[1] === 1) pMoves.push(moves.double.join(';'));
                }
                if (!getSlotData(moves.left).noFigure && !getSlotData(moves.left).isWhite) pMoves.push(moves.left.join(';'));
                if (!getSlotData(moves.right).noFigure && !getSlotData(moves.right).isWhite) pMoves.push(moves.right.join(';'));
                break;
            case 12:
                name = "horseWhite";
                horseLogic(true)
                break;
            case 13:
                name = 'bishopWhite';
                bishopLogic(true)
                break;
            case 15:
                name = "rookWhite";
                rookLogic(true)

                break;
            case 17:
                name = 'kingWhite';
                kingLogic(true)
                break;
            case 18:
                name = 'queenWhite';
                bishopLogic(true);
                rookLogic(true);
                break;
            case 21:
                name = 'pawnBlack';
                moves = {
                    forward: [figureData[1] - 1, figureData[2]],
                    double: [figureData[1] - 2, figureData[2]],
                    left: [figureData[1] - 1, figureData[2] + 1],
                    right: [figureData[1] - 1, figureData[2] - 1]
                }

                if (getSlotData(moves.forward).noFigure) {
                    pMoves.push(moves.forward.join(';'));
                    if (getSlotData(moves.double).noFigure && figureData[1] === 6) pMoves.push(moves.double.join(';'));
                }
                if (!getSlotData(moves.left).noFigure && getSlotData(moves.left).isWhite) pMoves.push(moves.left.join(';'));
                if (!getSlotData(moves.right).noFigure && getSlotData(moves.right).isWhite) pMoves.push(moves.right.join(';'));

                break;
            case 22:
                name = "horseBlack";
                horseLogic(false)

                break;
            case 23:
                name = 'bishopBlack';
                bishopLogic(false)
                break;
            case 25:
                name = "rookBlack";
                rookLogic(false)
                break;
            case 27:
                name = 'kingBlack';
                kingLogic(true)
                break;
            case 28:
                name = 'queenBlack';
                bishopLogic(false);
                rookLogic(false);
                break;
            default :
                break;
        }
        console.log(pMoves)
        console.log(name)
        figureData.push(figId)
        dispatch({type: action, payload: {possibleMoves: pMoves, selectedFigure: figureData}})


    }
    if (figureData[3] === 'possible') {
        let selected = state.selectedFigure
        sBoard[figureData[1]][figureData[2]] = selected[4]
        sBoard[selected[1]][selected[2]] = null;
        socket.emit('moveChess', sBoard)
    }
    else if (figureData[0]) displayMoves(e, figId)

}

export const setState = (newState) => dispatch => {
    let action = 'CHANGE_STATE_CHESS';
    if (newState.isWhite) newState.isWhite = true;
    console.log(newState)
    dispatch({type: action, payload: newState})
}
/*
export const checkForCheck = () => dispatch => {
    let action = "CHECK_CHECK_MATE";
    
}*/