import React, {Component} from 'react';


export default class Shipyard extends Component {
    constructor() {
        super()
        this.state = {
            ship: {},
            hangar: []

        }
    }

    componentWillMount(){
        fetch('http://192.168.1.3:4004/hangar').then(res => res.json()).then(j =>{ this.setState(j);console.log(j)})
    }




    render() {

        let items = this.state.hangar.map((item,index)=>{


            return (<div className={'col-3'} key={index+'item'}>
                type: {item.type}<br/>
                tier: {item.tier}<br/>
                {item.primary.displayString}<br/>
                {item.secondary.displayString}<br/>
            </div>)
        })

        return (
            <div className={'row'}>
                {items}
            </div>
        );
    }
}

