import * as actionTypes from '../actionTypes';
import {updateObject} from "../../shared/utils/utils";

const initialState = {
    stocksNews: [],
    stockNewsLoading: false
}

const setStocksMarketNewsData = (state, action) => {
    return updateObject(state, {stocksNews: action.payload});
}

const setStocksNewsLoading = (state, action) => {
    return updateObject(state, {stockNewsLoading: action.value})
}

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_STOCKS_MARKET_NEWS_SUCCESS:
            return setStocksMarketNewsData(state, action);
        case actionTypes.SET_STOCKS_NEWS_LOADING:
            return setStocksNewsLoading(state, action);
        default:
            return state;
    }
}

export default newsReducer;