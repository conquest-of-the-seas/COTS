import React, {Component} from 'react';
import ArticleEditor from "./ArticleEditor";
import RequestModel from "../../RequestModel";


export default class Articles extends RequestModel {
    constructor() {
        super()
        this.state = {
            articleList: []
        }
    }

    componentWillMount() {
        this.fetchArticles()
    }

    fetchArticles = () => fetch(`http://${window.location.hostname}:3004/articles`).then(res => res.json()).then(j => this.setState({articleList: j}))

    render() {

        let aricles = this.state.articleList.map((art, index) => {
            //returns a row of 3 cols
            art.text = art.text
                .replace(/\[b]/g, '<b>').replace(/\[\/b\]/g, '</b>')
                .replace(/\n/g, '<br/>')
                .replace(/\[i]/g, '<i>').replace(/\[\/i\]/g, '</i>')
                .replace(/\[u]/g, '<u>').replace(/\[\/u\]/g, '</u>')
                .replace(/\[quote]/g, '<br/><span style="background: lightblue; border-radius: 20px;padding: 5px">').replace(/\[\/quote\]/g, '</span><br/>')
                .replace(/\[h2]/g, '<h2>').replace(/\[\/h2\]/g, '</h2>');

            const linkRegex = /\[link=(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?)\]([^[]+)\[\/link\]/g;
            let links = art.text.match(linkRegex);
            if (links) links.map((li, o) => {
                linkRegex.lastIndex = -1;
                let data = linkRegex.exec(li);
                let aTag = `<a target="_blank" rel="noopener noreferrer" href="${data[1]}">${data[5]}</a>`;
                art.text = art.text.replace(li, aTag);
            })


            const imgRegex = /\[img=(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?)\]([^[]+)\[\/img\]/g;
            let imgs = art.text.match(imgRegex);
            if (imgs) imgs.map((li, o) => {
                let data = imgRegex.exec(li);
                let imgTag = `<img src="${data[1]}" alt="${data[5]}"/>`;
                art.text = art.text.replace(li, imgTag);
            })


            return (<div style={{border: '1px solid black'}} key={art.number}>
                <h3>{art.title}</h3>
                <p dangerouslySetInnerHTML={{__html: art.text}}/>
                <p>Author: {art.author}</p>
            </div>)
        })
        return (
            <div>
                {aricles}
                <ArticleEditor refetch={this.fetchArticles.bind(this)}/>
            </div>
        );
    }
}

