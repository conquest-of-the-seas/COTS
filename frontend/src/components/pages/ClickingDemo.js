import React, {Component} from 'react';
import RequestModel from "../RequestModel";


export default class ClickingDemo extends RequestModel {
    constructor() {
        super()
        this.state = {
            totalClicks: 0,
        }
    }


    //This is a function which is called upon mounting this component
    //creating the link with the Server must be done here
    componentWillMount() {

    }

    registerClick(){
        let totalClicks = this.state.totalClicks+1
        this.setState({totalClicks:totalClicks})
        //todo
    }

    render() {

        return (<div>
            total clicks: {this.state.totalClicks}<br/>
            <button onClick={this.registerClick.bind(this)}>Click</button>
        </div>)
    }
}

