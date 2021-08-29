import {combineReducers} from "redux";
import stocksReducer from "./stocksReducer";
import cryptocurrenciesReducer from "./cryptocurrenciesReducer";

const rootReducer = combineReducers({
    stocksReducer: stocksReducer,
    cryptocurrenciesReducer: cryptocurrenciesReducer
})

export default rootReducer;