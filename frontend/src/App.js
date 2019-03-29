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
        //logic
    }
    render() {
        return (
            <div className="App">
                <Header/>
                <Router cookie={this.state.cookie}/>
            </div>
        );
    }
}

export default App;
