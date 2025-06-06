import actionTypes from "./actionTypes";
import * as apis from "../../apis/notification";

export const isReadNotification = (id, data) => async (dispatch) => {
    try {
        const response = await apis.isReadNotification(id, data);
        if (response?.status === 200) {
            dispatch({
                type: actionTypes.IS_READ_NOTIFI,
                payload: response.data,
            });
        } else {
            dispatch({
                type: actionTypes.IS_READ_NOTIFI_ERR,
                payload: response.data,
            });
        }
    } catch (err) {
        dispatch({
            type: actionTypes.IS_READ_NOTIFI_ERR,
            payload: err.response?.data || "Đã xảy ra lỗi",
            err,
        });
    }
};

export const getNotifiByUser = (id) => async (dispatch) => {
    try {
        const response = await apis.getNotifiByUser(id);
        if (response?.status === 200) {
            dispatch({
                type: actionTypes.GET_NOTIFI_USER,
                payload: response.data,
            });
        } else {
            dispatch({
                type: actionTypes.GET_NOTIFI_USER_ERR,
                payload: response.data,
            });
        }
    } catch (err) {
        dispatch({
            type: actionTypes.GET_NOTIFI_USER_ERR,
            payload: err.response?.data || "Đã xảy ra lỗi",
            err,
        });
    }
};