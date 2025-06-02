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
                type: actionType.UPDATE_CART_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionType.UPDATE_CART_ERR,
            payload: (error.response && error.response.data) || { message: 'Lỗi server vui lòng thử lại sau' }
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
                type: actionType.DELETE_CART_ITEM_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionType.DELETE_CART_ITEM_ERR,
            payload: (error.response && error.response.data) || { message: 'Lỗi server vui lòng thử lại sau' }
        })
    }
}
