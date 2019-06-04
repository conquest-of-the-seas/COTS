import React, {Component} from 'react';
import './App.css';
import Router from "./components/partials/Router";
import Header from "./components/partials/Header";
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'


import store from './store'
class App extends Component {
    constructor() {
        super();
        this.state = {
            cookie: '12312'
        }
    }

    componentWillMount() {
        //todo cookie logic on first load
        //attach prop to the header
    }


    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Header/>
                    <Router/>
                </div>
            </Provider>
        );
    }
}

export default App;
