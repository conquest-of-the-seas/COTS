import React, {Component} from 'react';



export default class GameMap extends Component {
    constructor(){
        super()
        this.state = {
            data: {text:'this is an empty object'}
        }
    }

    componentWillMount() {
        fetch('http://192.168.1.3:4004/data').then(res => res.json()).then(j => this.setState({data: j}))
    }
    render() {

        return (
            <div>
                {JSON.stringify(this.state.data)}
            </div>
        );
    }
}

