import actionType from "../actions/actionTypes";

const initState = {
    article: [],
    productsCategory: [],
    banner: []
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
        default:
            return state
    }
}

export default appReducer