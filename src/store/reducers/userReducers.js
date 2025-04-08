import  actionType from '../actions/actionTypes';

const initialState = {
    currentUser: null,
    cart: [],
    productCart: [],
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
        default:
            return state;
    }
}

export default userReducer;