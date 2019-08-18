import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './REDUXreducers/index';


//todo try removing thunk later
const middleware = [thunk];


const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
));


export default store;