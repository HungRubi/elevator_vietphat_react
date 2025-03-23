import actionType from "../actions/actionTypes";

const initState = {
    articles: [],
    productsCategory: [],
    banner: [],
    products: [],
    productDetail: {},
    articleDetail: {},
    productSuggest: [],
    articleSuggest: [],
    productNewLast: [],
    video: [],
    videoDetail: {},
    listVideo: [],
}

const appReducer = (state = initState, action) => {
    switch (action.type){
        case actionType.GET_HOME:
            return {
                ...state,
                article: action.homeData.data.article || [],
                productsCategory: action.homeData.data.products || [],
                banner: action.homeData.data.banner || [],
                video: action.homeData.data.video || [] 
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
            return {
                ...state,
                productDetail: action.payload?.data?.product || {},
                productSuggest: action.payload?.data?.productSuggest || []
            }
        
        case actionType.GET_ARTICLE_DETAIL:
            return {
                ...state,
                articleDetail: action.payload?.article || {},
                articleSuggest: action.payload?.formNewArticles || [],
                productNewLast: action.payload?.formNewProduct || []
            }

        case actionType.GET_VIDEO_DETAIL:
            return {
                ...state,
                videoDetail: action.payload?.data?.video || {},
                listVideo: action.payload?.data?.videos || [],
                articleSuggest: action.payload?.data?.articleSuggest || [],
                productNewLast: action.payload?.data?.productSuggest || []
            }

        default:
            return state
    }
}

export default appReducer