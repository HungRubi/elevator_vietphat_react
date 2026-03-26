import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menu_mobie: false,
    message: null,
    loginError: null,
    registerError: null,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleMenuMobie: (state, action) => {
            state.menu_mobie = Boolean(action.payload);
        },
        setMessage: (state, action) => {
            state.message = action.payload ?? null;
        },
        clearMessage: (state) => {
            state.message = null;
        },
        setLoginError: (state, action) => {
            state.loginError = action.payload ?? null;
        },
        setRegisterError: (state, action) => {
            state.registerError = action.payload ?? null;
        },
        clearAuthErrors: (state) => {
            state.loginError = null;
            state.registerError = null;
        },
    },
});

export const {
    toggleMenuMobie,
    setMessage,
    clearMessage,
    setLoginError,
    setRegisterError,
    clearAuthErrors,
} = uiSlice.actions;

export default uiSlice.reducer;

