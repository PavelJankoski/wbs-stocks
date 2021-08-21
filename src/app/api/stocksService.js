import API_DRIVER from "../../axiosConfig";


const StocksService = {
    // USE stocksTimeSeries object FOR timeSeries constants
    // example: https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo
    fetchDataForTimeSeries: (timeSeries, symbol) => {
        return API_DRIVER.get('',{
            params: {
                function: `TIME_SERIES_${timeSeries}`,
                symbol: symbol
            }
        })
    }
}

export default StocksService;