import actionType from "./actionTypes";
import * as apis from '../../apis/home'

export const getHome = () => async (dispatch)  => {
    try{
        const response = await apis.getHome();
        if(response.status === 200) {
            dispatch({
                type: actionType.GET_HOME,
                homeData: response.data
            })
        }else{
            dispatch({
                type: actionType.GET_HOME,
                homeData: null
            })
        }
    }catch(err){
        dispatch({
            type: actionType.GET_HOME,
            homeData: null,
            err
        })
    }
}

export const querySearch = (query) => async (dispatch)  => {
    try{
        const response = await apis.querySearch(query);
        if(response.status === 200) {
            dispatch({
                type: actionType.QUERY_SEARCH,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionType.QUERY_SEARCH,
                payload: null
            })
        }
    }catch(err){
        dispatch({
            type: actionType.QUERY_SEARCH,
            payload: null,
            err
        })
    }
}

export const resetMessage = (message) => {
    return {
        type: actionType.RESET_MESSAGE,
        message
    }
}
