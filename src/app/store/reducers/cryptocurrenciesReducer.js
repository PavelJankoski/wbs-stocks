import * as actionTypes from '../actionTypes';
import {stockChartObject, updateObject} from "../../shared/utils/utils";
import {FETCH_COIN_MARKET_CHART_DATA_SUCCESS} from "../actionTypes";
import lineColors from "../../shared/objects/lineColors";

const initialState = {
    coinsTableData: [],
    coinsTableLoading: false,
    exchangesTableData: [],
    exchangesTableLoading: false,
    coinDetails: null,
    coinOHCLData: [],
    coinMarketChartData: {
        chartData: {}
    }
}

const updateCoinsMarketData = (state, action) => {
    return updateObject(state, {coinsTableData: action.payload})
}

const setCoinsMarketDataLoading = (state, action) => {
    return updateObject(state, {
        coinsTableLoading: action.value
    })
}

const updateExchanges = (state, action) => {
    return updateObject(state, {exchangesTableData: action.payload})
}

const setExchangesLoading = (state, action) => {
    return updateObject(state, {
        exchangesTableLoading: action.value
    })
}

const updateCoinDetails = (state, action) => {
    return updateObject(state, {coinDetails: action.payload})
}

const updateCoinOHCLData = (state, action) => {
    return updateObject(state, {coinOHCLData: action.payload})
}

const updateCoinMarketChartData = (state, action) => {
    return updateObject(state, {
        coinMarketChartData:
            updateObject(state.coinMarketChartData, {
                chartData: stockChartObject(action.payload.dateTimes, action.payload.prices)
            })
    })
}

const cryptocurrenciesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_COINS_MARKET_DATA_SUCCESS:
            return updateCoinsMarketData(state, action);
        case actionTypes.SET_COINS_MARKET_DATA_LOADING:
            return setCoinsMarketDataLoading(state, action)
        case actionTypes.FETCH_EXCHANGES_SUCCESS:
            return updateExchanges(state, action);
        case actionTypes.SET_EXCHANGES_LOADING:
            return setExchangesLoading(state, action)
        case actionTypes.FETCH_COIN_DETAILS_SUCCESS:
            return updateCoinDetails(state, action)
        case actionTypes.FETCH_COIN_OHCL_DATA_SUCCESS:
            return updateCoinOHCLData(state, action)
        case actionTypes.FETCH_COIN_MARKET_CHART_DATA_SUCCESS:
            return updateCoinMarketChartData(state, action)
        default:
            return state;
    }
}

export default cryptocurrenciesReducer;
