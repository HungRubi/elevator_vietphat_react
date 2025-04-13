import actionType from "./actionTypes";
import * as apis from "../../apis/order"

export const addOrder = (data) => async (dispatch)  => {
    try{
        const response = await apis.addOrder(data);
        if(response.status === 200) {
            dispatch({
                type: actionType.ADD_ORDER,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionType.ADD_ORDER,
                payload: null
            })
        }
    }catch(err){
        dispatch({
            type: actionType.ADD_ORDER,
            payload: null,
            err
        })
    }
}