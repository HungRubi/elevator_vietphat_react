import actionTypes from './actionTypes';
import * as apis from '../../apis/user';

export const setCurrentUser = (user, cart, productCart, orders) => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        user,
        cart,
        productCart,
        orders,
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

export const clearCart = (productIds = []) => {
    return {
        type: actionTypes.CLEAR_CART,
        payload: productIds
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT,
    }
}

export const getOrderByUser =  (id) => async (dispatch) => {
    try{
        const response = await apis.getOrderByUser(id);
        console.log(response.data)
        if(response?.status === 200) {
            dispatch({
                type: actionTypes.GET_ORDER_BY_USER,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_ORDER_BY_USER,
                payload: null
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.GET_ORDER_BY_USER,
            payload: err
        })
    }
}