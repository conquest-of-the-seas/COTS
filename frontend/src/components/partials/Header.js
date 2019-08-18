import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {Navbar, NavDropdown, Nav} from 'react-bootstrap'
import RequestModel from "../RequestModel";
import cookie from 'react-cookies'

export default class Header extends Component {
    constructor() {
        super()
        this.state = {
            redirect: false
        }
    }

    render() {

        if (this.state.redirect && this.state.redirect !== window.location.pathname) {

            return (<Redirect to={this.state.redirect}/>)
        }
        if (cookie.load('loggedIn')) {
            return (
                <div>
                    <Navbar sticky="top">
                        <Navbar.Brand href="/">CotS</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav.Link onClick={() => this.setState({redirect: '/'})}>Home</Nav.Link>
                            <NavDropdown title="My Places" id="myPlaces">
                                <NavDropdown.Item onClick={() => this.setState({redirect: '/train'})}> Training
                                    Grounds </NavDropdown.Item>
                                <NavDropdown.Item
                                    onClick={() => this.setState({redirect: '/quests'})}> Quests </NavDropdown.Item>
                                <NavDropdown.Item
                                    onClick={() => this.setState({redirect: '/hangar'})}> Hangar </NavDropdown.Item>
                                <NavDropdown.Item
                                    onClick={() => this.setState({redirect: '/cabins'})}> Cabins </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => this.setState({redirect: '/player'})}> Player
                                    Data </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => {
                                    cookie.remove('loggedIn')
                                    //todo send logout request
                                    window.location.pathname = '/login'
                                }}> Logout </NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item
                                    onClick={() => this.setState({redirect: '/donate'})}> Donate </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="The Pub" id="myPlaces">
                                <NavDropdown.Item
                                    onClick={() => this.setState({redirect: '/articles'})}> Articles </NavDropdown.Item>
                                <NavDropdown.Item
                                    onClick={() => this.setState({redirect: '/demo'})}> Demo </NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item
                                    onClick={() => this.setState({redirect: '/donate'})}> Donate </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link onClick={() => this.setState({redirect: '/gameMap'})}>Map</Nav.Link>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Navbar sticky="top">
                        <Navbar.Brand href="/">CotS</Navbar.Brand>

                    </Navbar>
                </div>
            );
        }
    }
}

