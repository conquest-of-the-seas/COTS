import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import * as articleDetailsActions  from '../../../../REDUXactions//thePub/articleDetailsActions';

export class ArticleDetails extends Component {
    componentDidMount() {
        this.props.fetchArticle().then((article) => {
            this.props.changeField('article', article[0]);
            console.log(this.props.article);
        });
    }
    
    render() {
        return (
            <div>
                Details
            </div>
        )
    }
}

const mapStateToProps = state => ({
    articleDetailsActions: state.articleDetailsActions
});

export default connect(mapStateToProps, articleDetailsActions)(ArticleDetails);