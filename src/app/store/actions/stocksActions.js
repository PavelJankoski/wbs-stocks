import StocksService from "../../api/stocksService";
import * as actionTypes from '../actionTypes';
import {calculateStockPercentage, popularStockObject} from "../../shared/utils/utils";

export const fetchStocksByTimeSeries = (timeSeries, symbol) => {
    return (dispatch) => {
        StocksService.fetchDataForTimeSeries(timeSeries, symbol).then(res => {
            // TODO: dispatch action to reducer
        }).catch(e => {
            console.log(e);
        })
    }
}

export const fetchMostPopularStock = (timeSeries, symbol, interval) => {
    return (dispatch) => {
        dispatch({type: actionTypes.SET_POPULAR_STOCKS_LOADING, value: true});
        StocksService.fetchMostPopularStock(timeSeries, symbol, interval).then(res => {
            dispatch(
                {
                    type: actionTypes.FETCH_MOST_POPULAR_STOCK_SUCCESS,
                    payload: mapResponseToPopularStockData(res, interval, symbol),
                    symbol: symbol
                }
                )
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            dispatch({type: actionTypes.SET_POPULAR_STOCKS_LOADING, value: false, symbol: symbol});
        })
    }
}

const mapResponseToPopularStockData = (response, interval, symbol) => {
    let data = response.data[`Time Series (${interval})`]
    const prices = [];
    const dateTimes = [];
    for(let i = 9 ; i >= 0; i--) {
        let currentDateTime = Object.keys(data)[i];
        let currentPrice = parseFloat(data[currentDateTime]["4. close"]);
        prices.push(currentPrice);
        dateTimes.push(currentDateTime);
    }
    return {chartData: popularStockObject(dateTimes, prices, symbol), stockPercentage: calculateStockPercentage(prices[0], prices[9])}

}
