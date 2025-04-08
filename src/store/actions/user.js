import actionTypes from './actionTypes';

export const setCurrentUser = (user, cart, productCart) => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        user,
        cart,
        productCart,
    }
}

