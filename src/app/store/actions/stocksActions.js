import StocksService from "../../api/stocksService";

export const fetchStocksByTimeSeries = (timeSeries, symbol) => {
    return (dispatch) => {
        StocksService.fetchDataForTimeSeries(timeSeries, symbol).then(res => {
            // TODO: dispatch action to reducer
        }).catch(e => {
            console.log(e);
        })
    }
}