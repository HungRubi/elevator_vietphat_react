import appReducer from "./appReducers";
import userReducer from "./userReducers";
import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from 'redux-persist';

const commonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
}

const userConfig = {
    ...commonConfig,
    key: 'userElevator',
    whitelist: [
        'currentUser', 
        'cart', 
        'productCart',
        'selectedProducts',
        'orders'
    ],
}

const rootReducer = combineReducers({
    app: appReducer,
    user: persistReducer(userConfig, userReducer),
})

export default rootReducer