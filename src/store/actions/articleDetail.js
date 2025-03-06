import actionType from "./actionTypes";
import * as apis from '../../apis/articleDetail'

export const getArticleDetail = (slug) => async (dispatch)  => {
    try{
        const response = await apis.getArticleDetail(slug);
        if(response) {
            dispatch({
                type: actionType.GET_ARTICLE_DETAIL,
                payload: response.data.article[0],
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