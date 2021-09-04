import * as actionTypes from '../actionTypes';
import {updateObject} from "../../shared/utils/utils";

const initialState = {
    stocksNews: []
}

const setStocksMarketNewsData = (state, action) => {
    return updateObject(state, {stocksNews: action.payload});
}

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_STOCKS_MARKET_NEWS_SUCCESS:
            return setStocksMarketNewsData(state, action);
        default:
            return state;
    }
}

export default newsReducer;
