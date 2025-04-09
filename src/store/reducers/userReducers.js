import  actionType from '../actions/actionTypes';

const initialState = {
    currentUser: null,
    cart: [],
    productCart: [],
    selectedProducts: [],
    quantities: [],
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
                message: action.payload?.message || null,
            }
        default:
            return state;
    }
}

export default userReducer;