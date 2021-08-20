import {combineReducers} from "redux";
import stocksReducer from "./stocksReducer";

const rootReducer = combineReducers({
    stocksReducer: stocksReducer
})

export default rootReducer;