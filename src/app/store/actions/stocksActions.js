import StocksService from "../../api/stocksService";
import * as actionTypes from '../actionTypes';
import {calculateStockPercentage, toIsoDate} from "../../shared/utils/utils";

export const fetchStocksByTimeSeries = (timeSeries, symbol) => {
    return (dispatch) => {
        StocksService.fetchDataForTimeSeries(timeSeries, symbol).then(res => {
            // TODO: dispatch action to reducer
        }).catch(e => {
            console.log(e);
        })
    }
}

export const fetchMostPopularStock = (symbol) => {
    return (dispatch) => {
        dispatch({type: actionTypes.SET_POPULAR_STOCKS_LOADING, symbol: symbol, value: true});
        StocksService.fetchMostPopularStock(symbol).then(res => {
            dispatch(
                {
                    type: actionTypes.FETCH_MOST_POPULAR_STOCK_SUCCESS,
                    payload: mapResponseToPopularStockData(res, symbol)
                }
                )
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            dispatch({type: actionTypes.SET_POPULAR_STOCKS_LOADING, value: false, symbol: symbol});
        })
    }
}

const mapResponseToPopularStockData = (response, symbol) => {
    let data = response.data.data
    const prices = [];
    const dateTimes = [];
    for(let i = data.length-1 ; i >= 0; i--) {
        let currentDateTime = data[i].date
        let currentPrice = parseFloat(data[i].open);
        prices.push(currentPrice);
        dateTimes.push(toIsoDate(currentDateTime))
    }
    return {prices: prices, dateTimes: dateTimes, stockPercentage: calculateStockPercentage(prices[0], prices[9]), symbol: symbol}

}
