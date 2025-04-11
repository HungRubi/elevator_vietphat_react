import actionTypes from './actionTypes';
import * as apis from '../../apis/user';

export const setCurrentUser = (user, cart, productCart) => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        user,
        cart,
        productCart,
    }
}

export const setSelectedProducts = (productId, quantity)  => {
    return {
        type: actionTypes.SET_SELECTED_PRODUCTS,
        productId,
        quantity,
    }
}

export const updateAddress =  (data, id) => async (dispatch) => {
    try{
        const response = await apis.updateAdress(data, id);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.UPDATE_ADDRESS,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.UPDATE_ADDRESS,
                payload: response.data,
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.UPDATE_ADDRESS,
            payload: err,
        })
    }
}

export const selectVoucher = (voucher) => {
    return {
        type: actionTypes.SELECT_VOUCHER,
        payload: voucher
    }
}

export const resetMessageUser = () => {
    return {
        type: actionTypes.RESET_MESSAGE_USER
    }
}