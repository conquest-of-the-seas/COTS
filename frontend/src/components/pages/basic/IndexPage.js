import React, {Component} from 'react';
import RequestModel from "../../RequestModel";

//const BackEndURL = `${window.location.hostname}:4004`


export default class IndexPage extends RequestModel {
    constructor() {
        super()
        this.state = {
            data: {text:'this is an empty object'}
        }
    }

   

    render() {

        return (
            <div>
                Index Page
            </div>
        );
    }
}

