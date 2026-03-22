import actionTypes from "./actionTypes";
import * as apis from '../../apis/auth'
import { setStoredAccessToken, clearStoredAccessToken } from "../../util/token";

const extractAccessToken = (responseData) => {
    return responseData?.accessToken
        || responseData?.data?.accessToken
        || null;
};

export const login = (data, isAdmin = false) => async (dispatch) => {
    try {
        const response = await apis.login(data, isAdmin);
        if (response?.status === 200) {
            const accessToken = extractAccessToken(response.data);
            if (accessToken) {
                setStoredAccessToken(accessToken);
                dispatch({
                    type: actionTypes.SET_ACCESS_TOKEN,
                    payload: accessToken,
                });
            }
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
        clearStoredAccessToken();
        dispatch({
            type: actionTypes.SET_ACCESS_TOKEN,
            payload: null,
        });
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            payload: err.response?.data || "Đã xảy ra lỗi",
            err,
        });
    }
};

export const refreshAccessToken = () => async (dispatch) => {
    try {
        const response = await apis.refreshToken();
        if (response?.status === 200) {
            const accessToken = extractAccessToken(response.data);
            if (accessToken) {
                setStoredAccessToken(accessToken);
                dispatch({
                    type: actionTypes.SET_ACCESS_TOKEN,
                    payload: accessToken,
                });
            }
        }
        return response;
    } catch (err) {
        clearStoredAccessToken();
        dispatch({
            type: actionTypes.SET_ACCESS_TOKEN,
            payload: null,
        });
        throw err;
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

export const changePassword = (id, data) => async (dispatch) => {
    try {
        const response = await apis.changePassword(id, data);
        if (response?.status === 200) {
            dispatch({
                type: actionTypes.CHANGE_PASSWORD,
                payload: response.data,
            });
        } else {
            dispatch({
                type: actionTypes.CHANGE_PASSWORD_ERR,
                payload: response.data,
            });
        }
    } catch (err) {
        dispatch({
            type: actionTypes.CHANGE_PASSWORD_ERR,
            payload: err.response?.data || "Đã xảy ra lỗi",
            err,
        });
    }
};