import appReducer from "./appReducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    app: appReducer
})

export default rootReducer