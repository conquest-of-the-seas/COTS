import React, {Component} from 'react';
import './App.css';
import Router from "./components/partials/Router";
import Header from "./components/partials/Header";


class App extends Component {
    constructor(){
        super();
        this.state = {
            cookie: '12312'
        }
    }
    componentWillMount(){
       //todo cookie logic on first load
        //attach prop to the header
    }
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
