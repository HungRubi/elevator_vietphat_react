import actionType from "./actionTypes";
import * as apis from '../../apis/comments';

export const addComment = (data) => async (dispatch) => {
    try{
        const response = await apis.addComment(data);
        if(response.status === 200) {
            dispatch ({
                type: actionType.ADD_COMMENT,
                payload: response.data
            })
        }else{
            dispatch ({
                type: actionType.ADD_COMMENT,
                payload: response.data
            })
        }
    }catch(error){
        dispatch ({
            type: actionType.ADD_COMMENT,
            payload: error
        })
    }
}