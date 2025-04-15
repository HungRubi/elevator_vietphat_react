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

export const updateOrder = (id, data) => async (dispatch)  => {
    try{
        const response = await apis.updateOrder(id, data );
        if(response.status === 200) {
            dispatch({
                type: actionType.UPDATE_ORDER,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionType.UPDATE_ORDER,
                payload: response.data
            })
        }
    }catch(err){
        dispatch({
            type: actionType.UPDATE_ORDER,
            payload: null,
            err
        })
    }
}