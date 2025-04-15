import actionType from "./actionTypes";
import * as apis from '../../apis/cart'

export const updateCart = (data, id) => async (dispatch)  => {
    try{
        const response = await apis.updateCart(data, id);
        if(response.status === 200) {
            dispatch({
                type: actionType.UPDATE_CART,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionType.UPDATE_CART,
                payload: response.data
            })
        }
    }catch(err){
        dispatch({
            type: actionType.UPDATE_CART,
            payload: err,
        })
    }
}

export const deleteCartItem = (data, id) => async (dispatch)  => {
    try{
        const response = await apis.deleteCartItem(data, id);
        if(response.status === 200) {
            dispatch({
                type: actionType.DELETE_CART_ITEM,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionType.DELETE_CART_ITEM,
                payload: response.data
            })
        }
    }catch(err){
        dispatch({
            type: actionType.DELETE_CART_ITEM,
            payload: err,
        })
    }
}
