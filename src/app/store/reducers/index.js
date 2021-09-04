import {combineReducers} from "redux";
import stocksReducer from "./stocksReducer";
import cryptocurrenciesReducer from "./cryptocurrenciesReducer";
import newsReducer from "./newsReducer";

const rootReducer = combineReducers({
    stocksReducer: stocksReducer,
    cryptocurrenciesReducer: cryptocurrenciesReducer,
    newsReducer: newsReducer
})

export default rootReducer;
