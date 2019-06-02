import {combineReducers} from 'redux';
import cookie from "react-cookies";
import hangarReducer from "./hangarReducer";
import cabinsReducer from "./cabinsReducer";
import trainingGroundsReducer from "./trainingGroundsReducer";
import loginReducer from "./loginReducer";

export default combineReducers({
    hangarState:hangarReducer,
    cabinsState:cabinsReducer,
    trainingState: trainingGroundsReducer,
    loginState:loginReducer
})

