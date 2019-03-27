import React, {Component} from 'react';

const BackEndURL = '192.168.1.3:4004'


export default class IndexPage extends Component {
    constructor() {
        super()
        this.state = {
            data: {text:'this is an empty object'}
        }
    }

   

    render() {

        return (
            <div>
                {JSON.stringify(this.state.data)}
            </div>
        );
    }
}

