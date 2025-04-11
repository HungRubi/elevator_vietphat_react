import actionType from "./actionTypes";
import * as apis from '../../apis/discount'

export const getDiscounts = () => async (dispatch)  => {
    try{
        const response = await apis.getDiscounts();
        console.log(response)
        if(response.status === 200) {
            dispatch({
                type: actionType.GET_DISCOUNT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionType.GET_DISCOUNT,
                payload: response.data
            })
        }
    }catch(err){
        dispatch({
            type: actionType.GET_DISCOUNT,
            payload: null,
            err
        })
    }
}
