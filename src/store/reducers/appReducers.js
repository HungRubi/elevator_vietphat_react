import actionType from "../actions/actionTypes";

const initState = {
    articles: [],
    productsCategory: [],
    banner: [],
    products: [],
    productDetail: {},
    articleDetail: {},
    productSuggest: []
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
                products: action.productData?.data?.products || [],
                totalPage: action.productData?.data?.totalPage || 1,
            }
        
        case actionType.GET_ARTICLES:
            return {
                ...state,
                articles: action.articleData?.data?.articles || [],
                totalPage: action.articleData?.data?.totalPage || 1,
                
            }
        case actionType.GET_PRODUCT_DETAIL:
            console.log(action.payload?.data)
            return {
                ...state,
                productDetail: action.payload?.product || {},
                productSuggest: action.payload?.productSuggest || []
            }
        
        case actionType.GET_ARTICLE_DETAIL:
            return {
                ...state,
                articleDetail: action.payload?.article || {},
            }

        default:
            return state
    }
}

export default appReducer