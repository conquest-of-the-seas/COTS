import React, {Component} from 'react';
import './chess.css'
//import * as actionFunctions from "../../../../REDUXactions";//todo create actions file in the right directory
import connect from "react-redux/es/connect/connect";
import io from "socket.io-client"
import * as actionFunctions from '../../../../REDUXactions/thePub/chessActions';

//todo change component name
class Chess extends Component {

    componentWillUnmount() {
        this.socket.disconnect()
    }

    connectToSocket() {
        this.socket = io(`http://${window.location.hostname}:3004/chess`)
        this.socket.on('connect', () => {
            console.log('connected')
            this.socket.emit('isWhite', this.props.chessState.isWhite)
            this.props.setState({status: 'waiting'})
        })
        this.socket.on('opponent', () => {
            this.props.setState({status: 'playing'})
        })
        this.socket.on('moveOpponentChess', (board) => {
            console.log('yes')
            this.props.checkForCheck()
            this.props.setState({
                board: board, possibleMoves: [],
                selectedFigure: []
            })
        })
        this.socket.on('opponentLeft', () => {
            this.props.setState({status: 'opponentLeft'})
        })
    }

    handleClick(e, figId) {
        this.props.handleClick(e, figId, this.props.chessState, this.socket)
    }


    showColorPicker() {
        return (<div>
            <input className={'checkboxChess'} checked={this.props.chessState.isWhite}
                   onChange={(e) => this.props.setState({isWhite: e.target.value})} type={'checkbox'}/> White
            <input className={'checkboxChess'} checked={!this.props.chessState.isWhite}
                   onChange={(e) => this.props.setState({isWhite: !e.target.value})} type={'checkbox'}/> Black
            <input value={'Find opponent'} type={'button'} onClick={this.connectToSocket.bind(this)}/>
        </div>)
    }

    setBoard() {
        let board = []
        for (let i = 0; i < 8; i++) {
            board[i] = []
            for (let k = 0; k < 8; k++) {
                board[i][k] = (i % 2) ? (k % 2) : ((k + 1) % 2)
            }
        }

        let isPossibleMove = (x, y) => {
            let itIs = this.props.chessState.possibleMoves.find(a => a === `${x};${y}`)
            if (itIs) return 'possible'
            else return false
        }

        let chooseClass = (num) => {
            switch (num) {
                case 11:
                    return 'pawnWhite';
                case 12:
                    return "horseWhite";
                case 13:
                    return 'bishopWhite';
                case 15:
                    return "rookWhite";
                case 17:
                    return 'kingWhite';
                case 18:
                    return 'queenWhite';
                case 21:
                    return 'pawnBlack';
                case 22:
                    return "horseBlack";
                case 23:
                    return 'bishopBlack';
                case 25:
                    return "rookBlack";
                case 27:
                    return 'kingBlack';
                case 28:
                    return 'queenBlack';
                default :
                    return ''
            }
        }

        let sBoard = this.props.chessState.board;
        let extraBoardStyle = {}
        let extraSquareStyle = {}

        if (this.props.chessState.isWhite) {
            extraBoardStyle.transform = 'rotate(180deg) translate(0,calc(8 * -66px))'
            extraSquareStyle.transform = 'rotate(180deg)'
        }

        return (<div className={'board'} style={extraBoardStyle}>  {board.map((row, rowIndex) => {
            return row.map((col, colIndex) => {
                if (col) return (<div key={rowIndex + ';' + colIndex} className={'white'}>{<div style={extraSquareStyle}
                                                                                                onClick={(e) => this.handleClick.bind(this)(e, sBoard[rowIndex][colIndex])}
                                                                                                className={chooseClass(sBoard[rowIndex][colIndex]) + ' ' + rowIndex + ' ' + colIndex + ' ' + isPossibleMove(rowIndex, colIndex)}/>}</div>)
                else return (<div key={rowIndex + ';' + colIndex} className={'black'}>{<div style={extraSquareStyle}
                                                                                            onClick={(e) => this.handleClick.bind(this)(e, sBoard[rowIndex][colIndex])}
                                                                                            className={chooseClass(sBoard[rowIndex][colIndex]) + ' ' + rowIndex + ' ' + colIndex + ' ' + isPossibleMove(rowIndex, colIndex)}/>}</div>)
            })
        })}
        </div>)
    }

    displayMsg(msg) {
        return (<div><h1>{msg}</h1></div>)
    }

    render() {
        console.log(this.props.chessState)
        switch (this.props.chessState.status) {
            case 'new':
                return this.showColorPicker();
            case 'waiting':
                return this.displayMsg('Waiting for opponent');
            case 'opponentLeft':
                return this.displayMsg('Your opponent has left the game');
            case 'playing':
                return this.setBoard();
            default :
                break;
        }

        return (
            <div>
                <input className={'checkboxChess'} checked={this.props.chessState.isWhite}
                       onChange={(e) => this.props.setState({isWhite: e.target.value})} type={'checkbox'}/> White
                <input className={'checkboxChess'} checked={!this.props.chessState.isWhite}
                       onChange={(e) => this.props.setState({isWhite: !e.target.value})} type={'checkbox'}/> Black
                <input value={'Find opponent'} type={'button'} onClick={this.connectToSocket.bind(this)}/>
            </div>
        );
    }
}

//todo change names of variables
const mapStateToProps = state => ({
    chessState: state.chessState
})


export default connect(mapStateToProps, actionFunctions)(Chess)