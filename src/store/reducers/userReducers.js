import  actionType from '../actions/actionTypes';

const initialState = {
    currentUser: null,
    cart: [],
    productCart: [],
    selectedProducts: [],
    quantities: [],
    messageUser: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.user,
                cart: action.cart,
                productCart: action.productCart,
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

        case actionType.RESET_MESSAGE_USER:
            return {
                ...state,
                messageUser: null,
            }

        default:
            return state;
    }
}

export default userReducer;