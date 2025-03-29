import actionTypes from "./actionTypes";
import * as apis from '../../apis/auth'

export const login = (data) => async (dispatch) => {
    try {
        const response = await apis.login(data);
        if (response?.status === 200) {
            dispatch({
                type: actionTypes.LOGIN,
                payload: response.data,
            });
        } else {
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                payload: response.data,
            });
        }
    } catch (err) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            payload: err.response?.data || "Đã xảy ra lỗi",
            err,
        });
    }
};

export const register = (data) => async (dispatch) => {
    try {
        const response = await apis.register(data);
        console.log(response)
        if (response?.status === 200) {
            dispatch({
                type: actionTypes.REGISTER,
                payload: response.data,
            });
        } else {
            dispatch({
                type: actionTypes.REGISTER_FAIL,
                payload: response.data,
            });
        }
    } catch (err) {
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            payload: err.response?.data || "Đã xảy ra lỗi",
            err,
        });
    }
};