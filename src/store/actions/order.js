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
                type: actionType.ADD_ORDER_ERR,
                payload: response.data
            })
        }
    }catch(err){
        dispatch({
            type: actionType.ADD_ORDER_ERR,
            payload: err.response,
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

export const createPaymentUrl = (data) => async (dispatch)  => {
    try{
        const response = await apis.createPaymentUrl(data);
        if(response.status === 200) {
            dispatch({
                type: actionType.CREATE_PAYMENT_URL,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionType.CREATE_PAYMENT_URL_ERR,
                payload: response.data
            })
        }
    }catch(err){
        dispatch({
            type: actionType.CREATE_PAYMENT_URL_ERR,
            payload: err.response,
        })
    }
}

export const paymentCheckOut = (searchParams) => async (dispatch)  => {
    try{
        const response = await apis.paymentCheckOut(searchParams);
        if(response.status === 200) {
            dispatch({
                type: actionType.PAYMENT_CHECKOUT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionType.PAYMENT_CHECKOUT_ERR,
                payload: response.data
            })
        }
    }catch(err){
        dispatch({
            type: actionType.PAYMENT_CHECKOUT_ERR,
            payload: err.response,
        })
    }
}

export const setInforOrder = (data) => {
    return {
        type: actionType.SET_INFOR_ORDER,
        data
    }
}

export const resetInforOrder = () => {
    return {
        type: actionType.RESET_INFOR_ORDER,
    }
}