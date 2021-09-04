import NewsService from "../../api/newsService";
import * as actionTypes from '../actionTypes';

export const fetchStocksMarketNews = () => {
    return (dispatch) => {
        NewsService.fetchStocksMarketNews().then(res => {
            dispatch({type: actionTypes.FETCH_STOCKS_MARKET_NEWS_SUCCESS, payload: res.data});
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            //
        })
    }
}
