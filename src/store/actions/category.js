import actionType from "./actionTypes";
import * as apis from "../../apis/category";

export const getCategoryProduct = () => async (dispatch) => {
    try{
        const response = await apis.getCategoryProduct();
        if(response.status === 200) {
            dispatch({
                type: actionType.GET_CATEGORY,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionType.GET_CATEGORY_ERR,
                payload: response.data
            })
        }
    }catch(error) {
        dispatch({
            type: actionType.GET_CATEGORY_ERR,
            payload: error.response
        })
    }
}

export const getProductByCategory = (id) => async (dispatch) => {
    try{
        const response = await apis.getProductByCategory(id);
        if(response.status === 200) {
            dispatch({
                type: actionType.GET_PRODUCT_BY_CATEGORY,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionType.GET_PRODUCT_BY_CATEGORY_ERR,
                payload: response.data
            })
        }
    }catch(error) {
        dispatch({
            type: actionType.GET_PRODUCT_BY_CATEGORY_ERR,
            payload: error.response
        })
    }
}