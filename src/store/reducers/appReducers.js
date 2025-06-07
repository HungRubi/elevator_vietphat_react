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
    currentUser: null,
    productCart: [],
    cartUser: [],
    message: null,
    discount: [],
    productSearch: [],
    articleSearch: [],
    videoSearch: [],
    order: [],
    comments: [],
    categoryProduct: [],
    notification: [],
    paymentUrl: "",
    dataPayment: [],
}

const appReducer = (state = initState, action) => {
    switch (action.type){
        case actionType.PAYMENT_CHECKOUT:
            return {
                ...state,
                message: action.payload.message || null,
                dataPayment: action.payload.data || [],
            }

        case actionType.PAYMENT_CHECKOUT_ERR:
            return {
                ...state,
                message: action.payload.message || null,
            }
    
        case actionType.CREATE_PAYMENT_URL:
            return {
                ...state,
                paymentUrl: action.payload.paymentUrl || "",
            }

        case actionType.CREATE_PAYMENT_URL_ERR:
            return {
                ...state,
                message: action.payload.message || null,
            }

        case actionType.ADD_ORDER_ERR:
            return {
                ...state,
                message: action.payload.message || null,
            }

        case actionType.UPDATE_PROFILE_USER: 
            return {
                ...state,
                message: action.payload.message || []
            }
            
        case actionType.CHANGE_PASSWORD:
            return {
                ...state,
                message: action.payload.message || null
            }

        case actionType.UPDATE_PROFILE_USER_ERR: 
            return {
                ...state,
                message: action.payload.message || null
            }

        case actionType.CHANGE_PASSWORD_ERR:
            return {
                ...state,
                message: action.payload.message || null
            }

        case actionType.GET_CATEGORY:
            return {
                ...state,
                categoryProduct: action.payload.data?.categoryProduct || []
            }

        case actionType.IS_READ_NOTIFI_ERR: 
            return {
                ...state,
                message: action.payload.message || null
            }
            
        case actionType.GET_NOTIFI_USER_ERR: 
            return {
                ...state,
                message: action.payload.message || null
            }

        case actionType.GET_PRODUCT_BY_CATEGORY:
            return {
                ...state,
                products: action.payload.products || []
            }

        case actionType.LOGIN:
            return {
                ...state,
                notification: action.payload?.myNotifi || [],
                currentUser: action.payload?.user || null,
                message: action.payload?.message || null,
                cartUser: action.payload?.cart || [],
                productCart: action.payload?.product || [],
                orders: action.payload?.orders || [],
                loginError: null
            }
        case actionType.LOGIN_FAIL:
            return {
                ...state,
                message: action.payload || null,
                loginError: action.payload || null,
            }

        case actionType.REGISTER:
            return {
                ...state,
                message: action.payload?.message || null,
                registerError: null,
            }
        case actionType.REGISTER_FAIL:
            return {
                ...state,
                message: action.payload || null,
                registerError: action.payload || null,
            }

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
                productSuggest: action.payload?.data?.productSuggest || [],
                comments: action.payload?.data?.comment || []
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
        
        case actionType.RESET_MESSAGE:
            return {
                ...state,
                message: null,
                loginError: null,
                registerError: null,
            }
        case actionType.GET_DISCOUNT:
            return {
                ...state,
                discount: action.payload?.data?.formatDiscount || [],
            }

        case actionType.QUERY_SEARCH: 
            return {
                ...state,
                productSearch: action.payload?.product || [],
                articleSearch: action.payload?.article || [],
                videoSearch: action.payload?.video || [],
            }
        
        case actionType.ADD_COMMENT:
            return {
                ...state,
                message: action.payload?.message || null,
            }

        default:
            return state
    }
}

export default appReducer