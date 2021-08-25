import API_DRIVER from "../../axiosConfig";


const StocksService = {
    // Use stocksTimeSeries object for timeSeries constants
    // example: https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo
    fetchDataForTimeSeries: (timeSeries, symbol) => {
        return API_DRIVER.get('',{
            params: {
                function: `TIME_SERIES_${timeSeries}`,
                symbol: symbol
            }
        })
    },
    // Use stockInterval object for interval constants
    fetchMostPopularStock: (timeSeries, symbol, interval) => {
        return API_DRIVER.get('', {
            params: {
                function: `TIME_SERIES_${timeSeries}`,
                symbol: symbol,
                interval: `${interval}`
            }
        })
}
}

export default StocksService;
