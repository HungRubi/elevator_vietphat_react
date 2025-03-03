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