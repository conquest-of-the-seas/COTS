import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import './App.css';
import Router from "./components/partials/Router";
import Header from "./components/partials/Header";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Router/>
            </div>
        );
    }
}

export default App;
