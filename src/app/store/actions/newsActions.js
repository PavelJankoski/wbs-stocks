import NewsService from "../../api/newsService";
import * as actionTypes from '../actionTypes';

export const fetchStocksMarketNews = () => {
    return (dispatch) => {
        dispatch({type: actionTypes.SET_STOCKS_NEWS_LOADING, value: true});
        NewsService.fetchStocksMarketNews().then(res => {
            dispatch({type: actionTypes.FETCH_STOCKS_MARKET_NEWS_SUCCESS, payload: res.data});
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            dispatch({type: actionTypes.SET_STOCKS_NEWS_LOADING, value: false});
        })
    }
}

export const fetchCompanyNews = (symbol) => {
    return (dispatch) => {
        dispatch({type: actionTypes.SET_STOCKS_NEWS_LOADING, value: true});
        NewsService.fetchCompanyNews(symbol).then(res => {
            dispatch({type: actionTypes.FETCH_STOCKS_MARKET_NEWS_SUCCESS, payload: res.data});
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            dispatch({type: actionTypes.SET_STOCKS_NEWS_LOADING, value: false});
        })
    }
}
