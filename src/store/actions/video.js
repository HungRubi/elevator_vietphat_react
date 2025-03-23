import actionType from "./actionTypes";
import * as apis from '../../apis/video'


export const getVideoDetail = (slug) => async (dispatch)  => {
    try{
        const response = await apis.getVideoDetail(slug);
        if(response.status === 200) {
            console.log(response.data)
            dispatch({
                type: actionType.GET_VIDEO_DETAIL,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionType.GET_VIDEO_DETAIL,
                payload: null,
            })
        }
    }catch(err){
        dispatch({
            type: actionType.GET_VIDEO_DETAIL,
            payload: null,
            err
        })
    }
}