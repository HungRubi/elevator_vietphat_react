const initialState = {
    selectedPaymentMethod: 'cod', 
   
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PAYMENT_METHOD':
            return {
                ...state,
                selectedPaymentMethod: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
