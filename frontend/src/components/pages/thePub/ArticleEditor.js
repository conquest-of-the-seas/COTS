import React, {Component} from 'react';
import cookie from 'react-cookies';
import {FaBold} from "react-icons/fa";
import {FaItalic} from "react-icons/fa";
import {FaImage} from "react-icons/fa";
import {FaLink} from "react-icons/fa";
import {FaHeading} from "react-icons/fa";
import {FaUnderline} from "react-icons/fa";
import {FaQuoteRight} from "react-icons/fa";
import {FaTable} from "react-icons/fa";
import RequestModel from "../../RequestModel";
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import {isMobile} from 'react-device-detect';
import * as articleEditorActions from '../../../REDUXactions/thePub/articleEditorActions';
import connect from "react-redux/es/connect/connect";

class ArticleEditor extends RequestModel {
    constructor(props) {
        super(props)
        this.state = {
            requestMsg: '',
            customIcons: {
                categories: {
                  custom: () => <img alt="pirate-category" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnC7UBwZuPJIyHIFW96WEPcJAQzFHTjMwyU7vN-oCgaEd0F9u_-A' />
                }
              },
            customEmojis: [
                {          
                    // TODO: FIX THE CUSTOM EMOJIS
                    name: 'Octocat',
                    short_names: ['octocat'],
                    text: '',
                    emoticons: [],
                    keywords: ['github'],
                    imageUrl: 'https://github.githubassets.com/images/icons/emoji/octocat.png'
                }
              ]
        }
    }

    emoteInTextarea(el, newText) {

        let start = el.selectionStart;
        let end = el.selectionEnd;
        let text = el.value;
        let before = text.substring(0, start);
        let after = text.substring(end, text.length);
        el.value = (before + newText + after);
        el.selectionEnd = start + newText.length;
        el.focus();
    }

    componentDidMount() {
        document.querySelectorAll("button.emote").forEach((el) => {
            el.addEventListener("click", (e) => {
                this.emoteInTextarea(document.getElementById("Description"), e.currentTarget.value);
            });
        });

        document.querySelectorAll("button.text").forEach((el) => {
            el.addEventListener("click", (e) => {
                typeInTextarea(document.getElementById("Description"), e.currentTarget.value);
            });
        });

        function typeInTextarea(el, newText) {
            let start = el.selectionStart;
            let end = el.selectionEnd;
            let text = el.value;
            let before = text.substring(0, start);
            let after = text.substring(end, text.length);
            el.value = (before + newText + after);
            el.selectionEnd = start + (newText.indexOf("]") + 1);
            el.focus();
        }
    }

    render() {
        return (
            <div className="text-center">
                <h5>{this.state.requestMsg}</h5>
                <div className="m-20">
                    <input placeholder={'title'} 
                        onChange={(e) => this.props.changeField('title', e)}/><br/>
                </div>
                <div className="article-textarea-container">
                    <div>
                        <div className="m-20">
                            <button className="text" title="bold" value="[b][/b]"><FaBold/></button>
                            <button className="text" title="italic" value="[i][/i]"><FaItalic/></button>
                            <button className="text" title="heading" value="[h2][/h2]"><FaHeading/></button>
                            <button className="text" title="underline" value="[u][/u]"><FaUnderline/></button>
                            <button className="text" title="quote" value="[quote][/quote]"><FaQuoteRight/></button>
                            <button className="text" title="link" value="[link=URL][/link]"><FaLink/></button>
                            <button className="text" title="image" value="[img=URL][/img]"><FaImage/></button>
                        </div>
                        <textarea id="Description" cols="60" rows="8" 
                                onChange={(e) => this.props.changeField('text', e)} 
                                placeholder={'write your articles here'}/>
                        <br/>
                    </div>
                    <div id="Emoji-Container">
                        <Picker 
                            icons={this.state.customIcons}
                            custom={this.state.customEmojis}
                            set='messenger' 
                            onSelect={(el) => this.emoteInTextarea.call(this, document.querySelector("#Description"), el.native)}/>
                    </div>
                </div>
                <button onClick={() => this.props.postArticle({"title": this.props.articleEditorState.title, "text": this.props.articleEditorState.text})}>Submit</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    articleEditorState: state.articleEditorState
});

export default connect(mapStateToProps, articleEditorActions)(ArticleEditor);