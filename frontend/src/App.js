import React, {Component} from 'react';
import './App.css';
import Router from "./components/partials/Router";
import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';


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
                <div className="App App-bg">
                    <Header/>
                    <Router/>
                    <Footer/>
                </div>
            </Provider>
        );
    }
}

export default App;
