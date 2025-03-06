import actionType from "../actions/actionTypes";

const initState = {
    article: [],
    productsCategory: [],
    banner: [],
    products: [],
    productCache: {},
    articleCache: {},
    productDetail: null,
    articleDetail: null,
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
        
        case actionType.GET_ARTICLES:
            return {
                ...state,
                articleCache: {
                    ...state.articleCache, 
                    [action.articleData?.data?.currentPage]: action.articleData?.data?.articles, 
                },
                totalPageArticle: action.articleData?.data?.totalPage || 1,
                currentPageArticle: action.articleData?.data?.currentPage || 1,
                
            }
        case actionType.GET_PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: action.payload || null,
                products: action.suggest
            }
        
        case actionType.GET_ARTICLE_DETAIL:
            return {
                ...state,
                articleDetail: action.payload || null,
            }

        case actionType.SET_CURRENT_PAGE_ARTICLE: 
            return {
                ...state,
                currentPageArticle: action.payload,
            };

        case actionType.SET_CURRENT_PAGE: 
            return {
                ...state,
                currentPage: action.payload,
            };
        default:
            return state
    }
}

export default appReducer