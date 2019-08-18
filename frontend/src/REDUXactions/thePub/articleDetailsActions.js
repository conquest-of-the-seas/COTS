import { fetchRequest, fetchGetRequest } from "../.partials/mainFunctions";

export const fetchArticle = (fetchBody = {}) => dispatch => {
    
    let action = 'FETCH_ARTICLE';
    fetchBody = Object.assign({action:action}, fetchBody)
    return fetchGetRequest('articles?_id=5cfadf25b9d82f0bd8c88b16', fetchBody,dispatch,json => {
    });
}


export const changeField = (field,value) => dispatch => {
    console.log('changing')
    //todo use bot protection!!!
    let action = 'CHANGE_FIELD_ARTICLE_DETAILS';
    dispatch({
        type: action,
        payload: {
            field,
            value}
    })
}