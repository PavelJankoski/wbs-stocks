import StocksService from "../../api/stocksService";
import * as actionTypes from '../actionTypes';
import {calculateStockPercentage, toIsoDate} from "../../shared/utils/utils";
import latestStocksArray from "../../shared/objects/latestStocksArray";

export const fetchMostPopularStock = (symbol) => {
    return (dispatch) => {
        dispatch({type: actionTypes.SET_POPULAR_STOCKS_LOADING, symbol: symbol, value: true});
        StocksService.fetchStocksIntraday(symbol).then(res => {
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

export const fetchStocksForInterval = (symbol, interval, limit) => {
    return (dispatch) => {
        dispatch({type: actionTypes.SET_INTERVAL_STOCK_LOADING, value: true});
        StocksService.fetchStocksIntraday(symbol, interval, limit).then(res => {
            dispatch(
                {
                    type: actionTypes.FETCH_STOCK_IN_INTERVAL_SUCCESS,
                    payload: mapResponseToPopularStockData(res, symbol)
                }
            )
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            dispatch({type: actionTypes.SET_INTERVAL_STOCK_LOADING, value: false});
        })
    }
}

export const fetchLatestStockValues = (symbols) => {
    return (dispatch) => {
        StocksService.fetchLatestStockValues(symbols).then(res => {
            dispatch(mapResponseToLatestStocks(res.data.data));
        }).catch(e => {
            console.log(e);
        })
    }
}

export const searchStocks = (searchText) => {
    return (dispatch) => {
        dispatch({type: actionTypes.SET_SEARCH_STOCKS_LOADING, value: true});
        StocksService.searchStocks(searchText).then(res => {
            dispatch(mapResponseToSearchedStocks(res.data.result))
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            dispatch({type: actionTypes.SET_SEARCH_STOCKS_LOADING, value: false});
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
    return {prices: prices, dateTimes: dateTimes, stockPercentage: calculateStockPercentage(prices[0], prices[9]), symbol: symbol, lastData: data[0]}

}

const mapResponseToLatestStocks = (data) => {
    const latestStocksArr = [];
    data.forEach(s => {
        let name = latestStocksArray.find(sym => sym.shortName === s.symbol).name;
        let calculatedPercentage = calculateStockPercentage(s.open, s.close);
        latestStocksArr.push({
            name: name,
            shortName: s.symbol,
            change: calculatedPercentage,
            latestPrice: s.close
        })
    })
    return {type: actionTypes.FETCH_LATEST_STOCK_VALUES_SUCCESS, payload: latestStocksArr};
}

const mapResponseToSearchedStocks = (data) => {
    return {type: actionTypes.SEARCH_STOCKS_SUCCESS, payload: data.splice(0, 5).map(s => {
        return {
            name: s.description,
            symbol: s.symbol
        }
        })}
}
