import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";

// Hàm lấy dữ liệu từ localStorage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem("reduxState");
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
        return err;
    }
};

// Hàm lưu Redux state vào localStorage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("reduxState", serializedState);
    } catch (err) {
        console.error("❌ Lỗi lưu Redux state:", err);
    }
};

// Load state từ localStorage
const preloadedState = loadState();

// Tạo Redux store với `preloadedState`
const store = configureStore({
    reducer: rootReducer,
    preloadedState, // Sử dụng dữ liệu đã lưu trong localStorage
});

// Khi Redux state thay đổi, lưu lại vào localStorage
store.subscribe(() => {
    saveState(store.getState());
});

export default store;
