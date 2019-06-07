import {fetchRequest} from "../.partials/mainFunctions";

export const postArticle = (fetchBody = {}) => dispatch => {
    console.log(fetchBody);
    let action = 'POST_ARTICLE';
    fetchBody = Object.assign({action:action}, fetchBody)
    fetchRequest('articles', fetchBody,dispatch,json => {
    });
}

export const changeField = (field,event) => dispatch => {
    console.log('changing')
    //todo use bot protection!!!
    let action = 'CHANGE_FIELD_ARTICLE_EDITOR';
    dispatch({
        type: action,
        payload: {field:field,value:event.target.value}
    })
}