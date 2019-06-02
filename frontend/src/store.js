import {applyMiddleware, createStore, compose} from "redux";
import {composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './REDUXreducers';

const initialState = {}

//todo try removing thunk later
const middleware = [thunk]


const store = createStore(rootReducer,
    middleware,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
)


export default store