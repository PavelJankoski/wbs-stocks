import initialPopularStock from "../../shared/objects/initialPopularStock";
import * as actionTypes from '../actionTypes';
import {popularStockObject, updateObject} from "../../shared/utils/utils";

const initialState = {
    mostPopular: {
        TSLA: {...initialPopularStock, name: "Tesla Inc"},
        AAPL: {...initialPopularStock, name: "Apple Inc"},
        MSFT: {...initialPopularStock, name: "Microsoft Corp"},
        IBM : {...initialPopularStock, name: "IBM"}
    }
}

const updatePopularStocks = (state, action) => {
    return updateObject(state,
        {
            mostPopular: updateObject(state.mostPopular,
                {[`${action.payload.symbol}`]: updateObject(state.mostPopular[`${action.payload.symbol}`],
                        {
                        chartData: popularStockObject(action.payload.dateTimes, action.payload.prices, action.payload.symbol),
                        stockPercentage: action.payload.stockPercentage
                    })
                })
        })
}

const setPopularStocksLoading = (state, action) => {
    return updateObject(state,
        {
            mostPopular: updateObject(state.mostPopular,
                {[`${action.symbol}`]: updateObject(state.mostPopular[`${action.symbol}`],
                        {
                            loading: action.value
                        })
                })
        })
}

const stocksReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MOST_POPULAR_STOCK_SUCCESS:
            return updatePopularStocks(state, action);
        case actionTypes.SET_POPULAR_STOCKS_LOADING:
            return setPopularStocksLoading(state, action);
        default:
            return state
    }
}

export default stocksReducer;
