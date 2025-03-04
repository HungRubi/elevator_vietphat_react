import actionType from "./actionTypes";
import * as apis from '../../apis/products'

export const getProducts = (page = 1) => async (dispatch)  => {
    try{
        const response = await apis.getProducts(page);
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

export const setCurrentPage = (page) => ({
    type: actionType.SET_CURRENT_PAGE,
    payload: page
})