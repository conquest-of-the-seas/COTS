import React, {Component} from 'react';


export default class ArticleEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            title:'',
            requestMsg:''
        }
    }

    postArticle() {
        fetch('http://192.168.1.3:4004/articles', {
            method: "post",
            body: JSON.stringify({
                text:this.state.text,
                title:this.state.title
            }),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.text()).then(t => {
            this.setState({requestMsg:t})
            this.props.refetch()
        })
    }

    render() {

        return (
            <div>

                <h5>{this.state.requestMsg}</h5>
                <input placeholder={'title'} value={this.state.title} onChange={(e) => this.setState({title:e.target.value})}/><br/>
                <textarea onChange={(e) => this.setState({text:e.target.value})} value={this.state.text} placeholder={'write your articles here'}/><br/>
                <button onClick={this.postArticle.bind(this)}>Submit</button>
            </div>
        );
    }
}

