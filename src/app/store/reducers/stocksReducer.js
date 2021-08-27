import initialPopularStock from "../../shared/objects/initialPopularStock";
import * as actionTypes from '../actionTypes';
import {stockChartObject, updateObject} from "../../shared/utils/utils";
import lineColors from "../../shared/objects/lineColors";

const initialState = {
    mostPopular: {
        TSLA: {...initialPopularStock, name: "Tesla Inc"},
        AAPL: {...initialPopularStock, name: "Apple Inc"},
        MSFT: {...initialPopularStock, name: "Microsoft Corp"},
        IBM : {...initialPopularStock, name: "IBM"}
    },
    stockInInterval: {
        symbol: '',
        chartData: {},
        stockPercentage: 0.0,
        lastData: {},
        loading: true
    }
}

const updatePopularStocks = (state, action) => {
    return updateObject(state,
        {
            mostPopular: updateObject(state.mostPopular,
                {[`${action.payload.symbol}`]: updateObject(state.mostPopular[`${action.payload.symbol}`],
                        {
                        chartData: stockChartObject(action.payload.dateTimes, action.payload.prices, action.payload.symbol),
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

const updateStockInInterval = (state, action) => {
    let borderColor = lineColors.error.borderColor;
    let backgroundColor = lineColors.error.backgroundColor;
    if(action.payload.stockPercentage>=0) {
        borderColor = lineColors.success.borderColor
        backgroundColor = lineColors.success.backgroundColor;
    }
    return updateObject(state, {stockInInterval:
            updateObject(state.stockInInterval, {
                symbol: action.payload.symbol,
                chartData: stockChartObject(action.payload.dateTimes, action.payload.prices, action.payload.symbol, borderColor, backgroundColor),
                stockPercentage: action.payload.stockPercentage,
                lastData: action.payload.lastData
            })})
}

const setStockInIntervalLoading = (state, action) => {
    return updateObject(state, {stockInInterval:
            updateObject(state.stockInInterval,
                {
                loading: action.value
            }
            )})
}

const stocksReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MOST_POPULAR_STOCK_SUCCESS:
            return updatePopularStocks(state, action);
        case actionTypes.SET_POPULAR_STOCKS_LOADING:
            return setPopularStocksLoading(state, action);
        case actionTypes.FETCH_STOCK_IN_INTERVAL_SUCCESS:
            return updateStockInInterval(state, action);
        case actionTypes.SET_INTERVAL_STOCK_LOADING:
            return setStockInIntervalLoading(state, action);
        default:
            return state;
    }
}

export default stocksReducer;
