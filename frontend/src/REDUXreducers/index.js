import {combineReducers} from 'redux';
import cookie from "react-cookies";
import hangarReducer from "./myPlaces/hangarReducer";
import cabinsReducer from "./myPlaces/cabinsReducer";
import trainingGroundsReducer from "./myPlaces/trainingGroundsReducer";
import loginReducer from "./basic/loginReducer";
import playerDataReducer from "./myPlaces/playerDataReducer";
import questsReducer from "./myPlaces/questsReducer";
import shipReducer from "./myPlaces/shipReducer";
import footerReducer from "./.partials/footerReducer";
import articlesReducer from "./thePub/articlesReducer";
import articleEditorReducer from "./thePub/articleEditorReducer";
import marketReducer from "./thePub/marketReducer";
import pubReducer from "./thePub/pubReducer";
import statisticsReducer from "./thePub/statisticsReducer";
import registerReducer from "./basic/registerReducer";
import gameMapReducer from "./gameRelated/gameMapReducer";
import chessReducer from "./thePub/chessReducer";


const partials = {
    footerState: footerReducer,
}

const basic = {
    loginState: loginReducer,
    registerState:registerReducer
}

const gameRelated = {
    gameMapState: gameMapReducer
}



const myPlaces = {
    cabinsState: cabinsReducer,
    hangarState: hangarReducer,
    playerDataState: playerDataReducer,
    questsState: questsReducer,
    shipState: shipReducer,
    trainingState: trainingGroundsReducer
}

const thePub = {
    chessState:chessReducer,
    articlesState: articlesReducer,
    articleEditorState: articleEditorReducer,
    marketState: marketReducer,
    pubState: pubReducer,
    statisticsState: statisticsReducer
}


export default combineReducers(Object.assign({},basic,gameRelated, myPlaces, thePub));



