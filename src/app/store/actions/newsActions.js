import NewsService from "../../api/newsService";
import * as actionTypes from '../actionTypes';

export const fetchStocksMarketNews = () => {
    return (dispatch) => {
        NewsService.fetchNews().then(res => {
            dispatch({type: actionTypes.FETCH_STOCKS_MARKET_NEWS_SUCCESS, payload: res.data});
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            //
        })
    }
}

export const fetchCryptocurrenciesNews = () => {
    return (dispatch) => {
        NewsService.fetchNews('crypto').then(res => {
            dispatch({type: actionTypes.FETCH_CRYPTOCURRENCY_NEWS_SUCCESS, payload: res.data});
        }).catch(e => {
            console.log(e);
        }).finally(() => {
        })
    }
}
