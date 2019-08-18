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
import ArticleDetails from "../pages/thePub/Articles/ArticleDetails";
import Hangar from "../pages/myPlaces/Hangar";
import Cabins from '../pages/myPlaces/Cabins';
import PlayerData from "../pages/myPlaces/PlayerData";
import RequestModel from "../RequestModel";
import Chess from "../pages/thePub/chess/Chess";


export default class Router extends Component {

    constructor() {
        super()
        this.state = {}
    }

    componentWillMount() {

    }


    render() {
        return (
            <div>
                <Route path="/" exact component={() => <IndexPage/>}/>
                <Route path="/demo" exact component={()=><ClickingDemo/>}/>
                <Route path="/gameMap" exact component={()=><GameMap/>}/>
                <Route path="/train" exact component={()=><TrainingGrounds/>}/>
                <Route path="/quests" exact component={()=><Quests/>}/>
                <Route path="/chess" exact component={()=><Chess/>}/>
                <Route path="/register" exact component={() => <IndexPage/>}/>
                <Route path="/login" exact component={() => <IndexPage/>}/>
                <Route path="/articles/editor" exact component={() => <IndexPage/>}/>
                <Route path="/articles/details/:id" exact component={() => <ArticleDetails/>}/>
                <Route path="/articles" exact component={Articles}/>
                <Route path="/hangar" exact component={() => <Hangar/>}/>
                <Route path="/cabins" exact component={() => <Cabins/>}/>
                <Route path="/player" exact component={() => <PlayerData/>}/>
            </div>

        );
    }
}

