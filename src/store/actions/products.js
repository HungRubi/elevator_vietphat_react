import actionType from "./actionTypes";
import * as apis from '../../apis/products'

export const getProducts = () => async (dispatch)  => {
    try{
        const response = await apis.getProducts();
        if(response.status === 200) {
            dispatch({
                type: actionType.GET_PRODUCTS,
                productData: response.data
            })
        }else{
            dispatch({
                type: actionType.GET_PRODUCTS,
                productData: null
            })
        }
    }catch(err){
        dispatch({
            type: actionType.GET_PRODUCTS,
            productData: null,
            err
        })
    }
}

export const getProductDetail = (slug) => async (dispatch)  => {
    try{
        const response = await apis.getProductDetail(slug);
        if(response) {
            dispatch({
                type: actionType.GET_PRODUCT_DETAIL,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionType.GET_PRODUCT_DETAIL,
                payload: null,
            })
        }
    }catch(err){
        dispatch({
            type: actionType.GET_PRODUCT_DETAIL,
            payload: null,
            err
        })
    }
}


