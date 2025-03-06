import actionType from "./actionTypes";
import * as apis from '../../apis/productDetail'

export const getProductDetail = (slug) => async (dispatch)  => {
    try{
        const response = await apis.getProductDetail(slug);
        if(response) {
            dispatch({
                type: actionType.GET_PRODUCT_DETAIL,
                payload: response.data.product[0],
                suggest: response.data.products
            })
        }else{
            dispatch({
                type: actionType.GET_PRODUCT_DETAIL,
                payload: null,
                suggest: []
            })
        }
    }catch(err){
        dispatch({
            type: actionType.GET_PRODUCT_DETAIL,
            payload: null,
            suggest: [],
            err
        })
    }
}