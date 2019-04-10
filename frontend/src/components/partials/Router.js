import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import IndexPage from "../pages/basic/IndexPage";
import GameMap from "../pages/gameRelated/GameMap";
import TrainingGrounds from "../pages/myPlaces/TrainingGrounds";
import Quests from "../pages/myPlaces/Quests";
import ClickingDemo from "../pages/ClickingDemo";
import Register from "../pages/basic/Register";
import Login from "../pages/basic/Login";
import Articles from "../pages/thePub/Articles";
import Hangar from "../pages/myPlaces/Hangar";
import Cabins from '../pages/myPlaces/Cabins';
import Player from "../pages/myPlaces/Player";
import RequestModel from "../RequestModel";


export default class Router extends RequestModel {

    constructor() {
        super()
        this.state = {}
    }

    componentWillMount() {

    }

    render() {
        return (
            <div>
                <Route path="/" exact component={IndexPage}/>
                <Route path="/demo" exact component={ClickingDemo}/>
                <Route path="/gameMap" exact component={GameMap}/>
                <Route path="/train" exact component={TrainingGrounds}/>
                <Route path="/quests" exact component={Quests}/>
                <Route path="/register" exact component={() => <Register/>}/>
                <Route path="/login" exact component={() => <Login/>}/>
                <Route path="/articles" exact component={Articles}/>
                <Route path="/hangar" exact component={() => <Hangar/>}/>
                <Route path="/cabins" exact component={() => <Cabins/>}/>
                <Route path="/player" exact component={() => <Player/>}/>
            </div>

        );
    }
}

