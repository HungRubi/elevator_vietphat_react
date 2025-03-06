import actionType from "./actionTypes";
import * as apis from '../../apis/articles'

export const getArticles = (page = 1) => async (dispatch)  => {
    try{
        const response = await apis.getArticles(page);
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
export const setCurrentPageArticle = (page) => ({
    type: actionType.SET_CURRENT_PAGE_ARTICLE,
    payload: page
})