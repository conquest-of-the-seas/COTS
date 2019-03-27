import React, {Component} from 'react';
import ArticleEditor from "./ArticleEditor";


export default class Articles extends Component {
    constructor() {
        super()
        this.state = {
            articleList: []
        }
    }

    componentWillMount() {
        this.fetchArticles()
    }

    fetchArticles = () => fetch('http://192.168.1.3:4004/articles').then(res => res.json()).then(j => this.setState({articleList: j}))

    render() {

        let aricles = this.state.articleList.map((art, index) => {
            //returns a row of 3 cols
            return (<div style={{border: '1px solid black'}} key={art.number}>
                <h3>{art.title}</h3>
                <p dangerouslySetInnerHTML={{__html:art.text}}/>
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

