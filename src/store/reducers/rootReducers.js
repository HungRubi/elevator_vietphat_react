import authReducer from "../slices/authSlice";
import uiReducer from "../slices/uiSlice";
import userReducer from "../slices/userSlice";
import homeReducer from "../slices/homeSlice";
import searchReducer from "../slices/searchSlice";
import articlesReducer from "../slices/articlesSlice";
import productsReducer from "../slices/productsSlice";
import categoryReducer from "../slices/categorySlice";
import discountReducer from "../slices/discountSlice";
import paymentReducer from "../slices/paymentSlice";
import videoReducer from "../slices/videoSlice";
import commentReducer from "../slices/commentSlice";
import notificationStaffReducer from "../slices/notificationStaffSlice";
import orderStaffReducer from "../slices/orderStaffSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    ui: uiReducer,
    home: homeReducer,
    search: searchReducer,
    articles: articlesReducer,
    products: productsReducer,
    category: categoryReducer,
    discount: discountReducer,
    payment: paymentReducer,
    video: videoReducer,
    comment: commentReducer,
    notificationStaff: notificationStaffReducer,
    orderStaff: orderStaffReducer,
});

export default rootReducer;
