import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./store/reducers/rootReducers";

const reduxConfig = () => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });
    return { store };
};

export default reduxConfig;
