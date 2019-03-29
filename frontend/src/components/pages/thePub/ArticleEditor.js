import React, {Component} from 'react';
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaAlignCenter } from "react-icons/fa";
import { FaAlignLeft } from "react-icons/fa";
import { FaAlignRight } from "react-icons/fa";
import { FaUndo } from "react-icons/fa";

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
        fetch(`http://${window.location.hostname}:4004/articles`, {
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
                <form className="text-center mx-auto">
                    <h5>{this.state.requestMsg}</h5>
                    <div className="m-20">
                        <input placeholder={'title'} value={this.state.title} onChange={(e) => this.setState({title:e.target.value})}/><br/>
                    </div>
                    <div>
                        <button><FaBold/></button>
                        <button><FaItalic/></button>
                        <button><FaAlignLeft/></button>
                        <button><FaAlignCenter/></button>
                        <button><FaAlignRight/></button>
                        <button><FaUndo/></button>
                    </div>
                    <div className="m-20">
                        <textarea cols="60" rows="8" onChange={(e) => this.setState({text:e.target.value})} value={this.state.text} placeholder={'write your articles here'}/><br/>
                    </div>
                    <button onClick={this.postArticle.bind(this)}>Submit</button>
                </form>
            </div>
        );
    }
}

