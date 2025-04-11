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
