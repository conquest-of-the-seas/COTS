import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import IndexPage from "../pages/IndexPage";
import GameMap from "../pages/GameMap";
import TrainingGrounds from "../pages/TrainingGrounds";
import Quests from "../pages/Quests";
import ClickingDemo from "../pages/ClickingDemo";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Articles from "../pages/Articles";
import Shipyard from "../pages/Shipyard";


export default class Router extends Component {
    render() {
        return (
            <div>
                <Route path="/" exact component={IndexPage} />
                <Route path="/demo" exact component={ClickingDemo} />
                <Route path="/gameMap" exact component={GameMap} />
                <Route path="/train" exact component={TrainingGrounds} />
                <Route path="/quests" exact component={Quests} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route path="/articles" exact component={Articles}/>
                <Route path="/shipyard" exact component={Shipyard}/>
            </div>
        );
    }
}

