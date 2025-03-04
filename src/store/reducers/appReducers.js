import actionType from "../actions/actionTypes";

const initState = {
    article: [],
    productsCategory: [],
    banner: [],
    products: [],
    productCache: {}
}

const appReducer = (state = initState, action) => {
    switch (action.type){
        case actionType.GET_HOME:
            return {
                ...state,
                article: action.homeData.data.article || null,
                productsCategory: action.homeData.data.products || null,
                banner: action.homeData.data.banner || null 
            }
        case actionType.GET_PRODUCTS:
            return {
                ...state,
                productCache: {
                    ...state.productCache, 
                    [action.productData?.data?.currentPage]: action.productData?.data?.products, 
                },
                totalPage: action.productData?.data?.totalPage || 1,
                currentPage: action.productData?.data?.currentPage || 1,
                
            }
        case actionType.SET_CURRENT_PAGE: // Thêm xử lý đổi trang
            return {
                ...state,
                currentPage: action.payload,
            };
        default:
            return state
    }
}

export default appReducer