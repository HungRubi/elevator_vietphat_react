import  actionType from '../actions/actionTypes';

const initialState = {
    currentUser: null,
    cart: [],
    productCart: [],
    selectedProducts: [],
    quantities: [],
    messageUser: null,
    selectedVoucher: null,
    orders: [],
    myNotifi: [],
    inforOrder: {}
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.UPDATE_PROFILE_USER: 
            return {
                ...state,
                currentUser: action.payload.user || []
            }

        case actionType.SET_INFOR_ORDER:
            return {
                ...state,
                inforOrder: action.data
            }

        case actionType.RESET_INFOR_ORDER:
            return {
                ...state,
                inforOrder: null
            }

        case actionType.IS_READ_NOTIFI:
            return {
                ...state,
                myNotifi: action.payload.myNotifi || []
            }

        case actionType.GET_NOTIFI_USER:
            return {
                ...state,
                myNotifi: action.payload.myNotifi || []
            }
            
        case actionType.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.user,
                cart: action.cart,
                productCart: action.productCart,
                orders: action.orders,
                    
                myNotifi: action.myNotifi,
            }
        
        case actionType.LOGOUT:
            return {
                ...state,
                currentUser: null,
                cart: [],
                productCart: [],
                selectedProducts: [],
                selectedVoucher: null,
                orders: [],
                messageUser: null,
                myNotifi: null,
                inforOrder: null,
            }
        
        case actionType.SET_SELECTED_PRODUCTS:
            return {
                ...state,
                selectedProducts: action.productId,
                quantities: action.quantity,
            }

        case actionType.UPDATE_ADDRESS:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    ...action.payload?.updatedUser
                },
                messageUser: action.payload?.message || null,
            }

        case actionType.UPDATE_CART:
            return {
                ...state,
                cart: action.payload?.cart || state.cart,
                productCart: action.payload?.product || state.productCart,
                messageUser: action.payload?.message || null,
            }

        case actionType.DELETE_CART_ITEM_ERR:
            return {
                ...state,
                message: action.payload.message || null
            }

        case actionType.SELECT_VOUCHER:
            return {
                ...state,
                selectedVoucher: action.payload,
                messageUser: "Đã áp dụng voucher thành công",
            }

        case actionType.RESET_MESSAGE_USER:
            return {
                ...state,
                messageUser: null,
            }

        case actionType.ADD_ORDER:
            return {
                ...state,
                orders: (action.payload?.orders?.length > 0) ? action.payload.orders : state.orders,
            }

        case actionType.CLEAR_CART:
            return {
                ...state,
                selectedProducts: action.payload.length > 0 
                    ? state.selectedProducts.filter(item => !action.payload.includes(item.product._id))
                    : [],
                cart: action.payload.length > 0
                    ? state.cart.filter(item => !action.payload.includes(item.product_id))
                    : [],
                productCart: action.payload.length > 0
                    ? state.productCart.filter(item => !action.payload.includes(item._id))
                    : [],
                selectedVoucher: null
            }

        case actionType.UPDATE_ORDER:
            return {
                ...state,
                messageUser: action.payload?.message || null,
                orders: action.payload?.orders,
            }

        case actionType.DELETE_CART_ITEM:
            return {
                ...state,
                messageUser: action.payload?.message || null,
                cart: (action.payload?.cart?.length > 0) ? action.payload.cart : state.cart,
                productCart: (action.payload?.product?.length > 0) ? action.payload.product : state.product,
            }

        case actionType.GET_ORDER_BY_USER:
            return {
                ...state,
                orders: action.payload?.order || [],
            }
        default:
            return state;
    }
}

export default userReducer;