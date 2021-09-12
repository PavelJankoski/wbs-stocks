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
    },
    stocksTableData: [],
    detailsData: [],
    searchedStocks: [],
    detailsStockData: [],
    reportsData: [],
    epsCompany: {
        symbol: '',
        chartData: {},
        stockPercentage: 0.0,
        lastData: {}
    },
    stockExchanges: {
        data: [],
        total: 0
    },
    searchStocksLoading: false
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
const setEpsData = (state,action) => {
    let borderColor = lineColors.error.borderColor;
    let backgroundColor = lineColors.error.backgroundColor;
    if(action.payload.stockPercentage>=0) {
        borderColor = lineColors.success.borderColor
        backgroundColor = lineColors.success.backgroundColor;
    }
    return updateObject(state, {epsCompany: updateObject(state.epsCompany,{
            symbol: action.payload.symbol,
            chartData: stockChartObject(action.payload.dateTimes, action.payload.pricePerShare, action.payload.symbol, borderColor, backgroundColor),
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

const updateLatestStocks = (state, action) => {
    return updateObject(state, {stocksTableData: action.payload})
}

const updateSearchStocksData = (state, action) => {
    return updateObject(state, {searchedStocks: action.payload})
}

const setSearchStocksLoading = (state, action) => {
    return updateObject(state, {searchStocksLoading: action.value})
}

const setStocksExchanges = (state, action) => {
    return updateObject(state, {stockExchanges: updateObject(state.stockExchanges, {data: action.payload, total: action.total})});
}

const setDetailsData = (state, action) => {
    return updateObject(state, {detailsData: action.payload})
}

const setStockDetailsData = (state,action) => {
    return updateObject(state, {detailsStockData: action.payload})
}

const setReportsData = (state,action) => {
    return updateObject(state, {reportsData: action.payload})
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
        case actionTypes.FETCH_LATEST_STOCK_VALUES_SUCCESS:
            return updateLatestStocks(state, action);
        case actionTypes.SEARCH_STOCKS_SUCCESS:
            return updateSearchStocksData(state, action);
        case actionTypes.SET_SEARCH_STOCKS_LOADING:
            return setSearchStocksLoading(state, action);
        case actionTypes.FETCH_STOCKS_EXCHANGES_SUCCESS:
            return setStocksExchanges(state, action);
        case actionTypes.FETCH_DETAILS_DATA:
            return setDetailsData(state, action);
        case actionTypes.FETCH_STOCKS_DETAILS:
            return setStockDetailsData(state,action);
        case actionTypes.EPS_COMPANY_PER_YEAR:
            return setEpsData(state,action);
        case actionTypes.FETCH_REPORTS_DATA:
            return setReportsData(state,action);
        default:
            return state;
    }
}

export default stocksReducer;
