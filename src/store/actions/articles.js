import actionType from "./actionTypes";
import * as apis from '../../apis/articles'

export const getArticles = () => async (dispatch)  => {
    try{
        const response = await apis.getArticles();
        if(response.status === 200) {
            dispatch({
                type: actionType.GET_ARTICLES,
                articleData: response.data
            })
        }else{
            dispatch({
                type: actionType.GET_ARTICLES,
                articleData: null
            })
        }
    }catch(err){
        dispatch({
            type: actionType.GET_ARTICLES,
            articleData: null,
            err
        })
    }
}

export const getArticleDetail = (slug) => async (dispatch)  => {
    try{
        const response = await apis.getArticleDetail(slug);
        if(response) {
            dispatch({
                type: actionType.GET_ARTICLE_DETAIL,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionType.GET_ARTICLE_DETAIL,
                payload: null,
            })
        }
    }catch(err){
        dispatch({
            type: actionType.GET_ARTICLE_DETAIL,
            payload: null,
            err
        })
    }
}